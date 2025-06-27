const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const admin = require('firebase-admin');
const serviceAccount = require('./noorify-bd-firebase-adminsdk-fbsvc-467d704c1f.json');

app.use(cors({
    origin: ['http://localhost:5173', 'https://noorify-bangladesh.web.app'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.SECRET_KEY}:${process.env.SECRET_HASH}@cluster0.7kv5i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Gemini API 

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are Noorify AI, created by Noorify Tech. You are an Islamic scholar.  
You will only answer questions related to Islam. You will not answer any question outside Islamic topics.  

When providing an answer, always include **one reference from the Qur'an** and **one from the Hadith**.  
The format for references must be as follows:  

- **Quran:** [Verse in any language that user wants] : [Surah Name (Chapter:Verse)]  
- **Hadith:** [Hadith in any language that user wants] : [Hadith Collection Name (Hadith Number or Section Name)]  

Example format:  

**Answer:**  
[Islamic explanation]  

**Quran:** [Verse] : [Surah (Chapter:Verse)]  
**Hadith:** [Hadith] : [Hadith Collection (Hadith Number)]  

Do not add extra labels like "Reference" before Qur'an and Hadith. Always ensure proper formatting.  
Follow this instruction strictly in every response.`
});



async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        // await client.connect();

        const productsCollection = client.db("Noorify").collection("productDetails");
        const favouriteCollection = client.db("Noorify").collection("favouriteLists");
        const usersCollection = client.db("Noorify").collection("usersCollection");
        const questionsCollection = client.db("Noorify").collection("questionsCollection");
        const videoCollection = client.db("Noorify").collection("videoCollection");
        const cartsCollection = client.db("Noorify").collection("cartsCollection");
        const ordersCollection = client.db("Noorify").collection("ordersCollection");


        // JWT APIs

        app.post("/jwt", async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
                expiresIn: '24h'
            });
            res.cookie('token', token, {
                httpOnly: true,
                // secure: false, 
                // sameSite: 'none'
                secure: process.env.NODE_ENV === 'production', // Only secure in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'lax' for local development
            }).send({ success: true });
        })

        app.post("/logout", (req, res) => {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
            }).send({ success: true })
        })


        // Middlewares

        const verifyToken = (req, res, next) => {
            if (!req.cookies) {
                return res.status(401).send({ message: 'unauthorized access' })
            }
            const token = req.cookies.token;
            jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'unauthorized access' })
                }
                req.decoded = decoded;
                next()
            })
        }

        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            next()
        }

        // Gemini API's 

        app.get("/noorify-ai", async (req, res) => {
            try {
                const prompt = req.query.question;  // ✅ Corrected parameter extraction

                if (!prompt) {
                    return res.status(400).json({ error: "Question parameter is required" });
                }


                const result = await model.generateContent(prompt);
                const answerText = result.response.text(); // Ensure this works correctly

                res.json({
                    main: answerText.split("**Quran:**")[0].trim(),
                    quran: answerText.includes("**Quran:**") ? answerText.split("**Quran:**")[1].split("**Hadith:**")[0].trim() : "",
                    hadith: answerText.includes("**Hadith:**") ? answerText.split("**Hadith:**")[1].trim() : "",
                });
            } catch (error) {
                res.status(500).json({ error: "Failed to generate response" });
            }
        });


        // Video Collection 

        app.get("/videos", async (req, res) => {
            const result = await videoCollection.find().toArray();

            // Shuffle array using Fisher-Yates algorithm
            for (let i = result.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [result[i], result[j]] = [result[j], result[i]];
            }

            res.send(result);
        });

        app.get("/two-videos", async (req, res) => {
            const result = await videoCollection.aggregate([{ $sample: { size: 2 } }]).toArray();
            res.send(result);
        });

        app.post("/videos", verifyToken, verifyAdmin, async (req, res) => {
            const questions = req.body;
            const result = await videoCollection.insertOne(questions);
            res.send(result);
        })

        app.patch("/videos/:id", verifyToken, verifyAdmin, async (req, res) => {
            const params = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    title: params.title,
                }
            }
            const result = await videoCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete("/videos/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await videoCollection.deleteOne(query);
            res.send(result);
        });


        // Q and A Collection 

        app.get("/all-questions", verifyToken, verifyAdmin, async (req, res) => {
            const result = await questionsCollection.find().toArray();
            res.send(result);
        })

        app.get("/questions", verifyToken, async (req, res) => {
            const email = req.query.email;
            const result = await questionsCollection.find({ email }).toArray();
            res.send(result);
        })

        app.post("/questions", async (req, res) => {
            const questions = req.body;
            const result = await questionsCollection.insertOne(questions);
            res.send(result);
        })

        app.patch("/questions/:id", verifyToken, async (req, res) => {
            const questions = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    question: questions.question,
                    questionTime: questions.questionTime,
                }
            }
            const result = await questionsCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.patch("/answers/:id", verifyToken, verifyAdmin, async (req, res) => {
            const answers = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    answer: answers.answer,
                    answerTime: answers.answerTime,
                }
            }
            const result = await questionsCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete("/questions/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await questionsCollection.deleteOne(query);
            res.send(result);
        });


        // Products Collection APIs

        app.get("/products", async (req, res) => {
            const result = await productsCollection.find().toArray();
            res.send(result);
        })

        app.get("/products/men-tshirt-poloshirt", async (req, res) => {
            try {
                const products = await productsCollection.aggregate([
                    {
                        $match:
                        {
                            section: "Men", category:
                            {
                                $in:
                                    ["T-Shirts (half sleeve)", "Polo Shirt"]
                            }
                        }
                    },
                    // {
                    //     $sample:
                    //         { size: 20 }
                    // }
                ]).toArray();

                res.send(products);
            } catch (error) {
                res.status(500).send({ message: "Server Error" });
            }
        });

        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productsCollection.findOne(query);
            res.send(result);
        })

        app.post("/products", verifyToken, verifyAdmin, async (req, res) => {
            const productDetails = req.body;
            const result = await productsCollection.insertOne(productDetails);
            res.send(result);
        })

        app.patch("/products/:id", verifyToken, verifyAdmin, async (req, res) => {
            const product = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    image: product.image,
                    productLink: product.productLink,
                    price: product.price,
                    brand: product.brand,
                    section: product.section,
                    outfits: product.outfits,
                    category: product.category,
                }
            }
            const result = await productsCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete("/products/:id", verifyToken, verifyAdmin, async (req, res) => {
            const productId = req.params.id;
            const query = { _id: new ObjectId(productId) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })

        // User Collection APIs


        app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        app.get("/users/admin/:email", verifyToken, async (req, res) => {
            const email = req.params.email;
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === 'admin';
            }
            res.send({ admin })
        })

        app.get("/users/:email", verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        })

        app.post("/users", async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exist', insertedId: null })
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.patch("/users/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: "admin"
                }
            }
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.patch("/users/:id", verifyToken, async (req, res) => {
            const id = req.params.id;
            const newName = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    name: newName.name,
                }
            }
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result)
        })

        app.delete("/users/:id", verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        app.delete("/users/googleDelete/:id", verifyToken, verifyAdmin, async (req, res) => {
            const uid = req.params.id;
            const result = await admin.auth().deleteUser(uid);
            res.send(result)
        })

        // Favourite Collection APIs


        app.get("/favourites", verifyToken, async (req, res) => {
            const email = req.query.email;
            try {
                const favourites = await favouriteCollection.find({ email }).toArray();
                const favouriteProductsIds = favourites.map(fav => fav.productId).filter(id => ObjectId.isValid(id)).map(id => new ObjectId(id));
                const filteredProducts = await productsCollection.find({ _id: { $in: favouriteProductsIds } }).toArray();
                const enrichedProducts = filteredProducts.map(product => {
                    const favouriteItem = favourites.find(fav => fav.productId.toString() === product._id.toString());
                    return {
                        ...product,
                        favouriteId: favouriteItem ? favouriteItem._id : null, //
                    };
                });
                res.send(enrichedProducts);
            } catch (error) {
                res.status(500).send({ error: "Failed to fetch favourites" });
            }
        });

        app.post("/favourites", verifyToken, async (req, res) => {
            const favouriteItem = req.body;
            const existingFavourite = await favouriteCollection.findOne({
                productId: favouriteItem.productId,
                email: favouriteItem.email
            });

            if (existingFavourite) {
                return res.send({ message: "Already added to favourite list" });
            }

            const result = await favouriteCollection.insertOne(favouriteItem);
            res.send(result);
        });

        app.delete("/favourites/:id", verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await favouriteCollection.deleteOne(query);
            res.send(result);
        })

        // Carts Collection APIs

        app.get("/carts", verifyToken, async (req, res) => {
            const email = req.query.email;
            try {
                const carts = await cartsCollection.find({ email }).toArray();
                const cartProductsIds = carts.map(cart => cart.productId).filter(id => ObjectId.isValid(id)).map(id => new ObjectId(id));
                const cartProducts = await productsCollection.find({ _id: { $in: cartProductsIds } }).toArray();
                const enrichedProducts = cartProducts.map(product => {
                    const cartItem = carts.find(cart => cart.productId.toString() === product._id.toString());
                    return {
                        ...product,
                        cartId: cartItem ? cartItem._id : null, //
                    };
                });
                res.send(enrichedProducts);
            } catch (error) {
                res.status(500).send({ error: "Failed to fetch carts" });
            }
        });

        app.post("/carts", verifyToken, async (req, res) => {
            const cartItem = req.body;

            // Check if the item already exists in the cart
            const existingCartItem = await cartsCollection.findOne({
                productId: cartItem.productId,
                email: cartItem.email
            });

            if (existingCartItem) {
                return res.send({ message: "Already added to cart" });
            }

            // Insert the new cart item if it doesn't exist
            const result = await cartsCollection.insertOne(cartItem);
            res.send(result);
        });

        app.delete("/carts/:id", verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartsCollection.deleteOne(query);
            res.send(result);
        })

        // Order Collection  

        app.get("/all-orders", verifyToken, verifyAdmin, async (req, res) => {
            const orders = await ordersCollection.find().toArray();

            // Extract all product IDs from orders
            const productIds = orders.flatMap(order => order.items.map(item => new ObjectId(item.productId)));

            // Fetch all product details
            const products = await productsCollection.find({ _id: { $in: productIds } }).toArray();

            // Map product details to orders
            const ordersWithProducts = orders.map(order => {
                return {
                    ...order,
                    items: order.items.map(item => {
                        const product = products.find(p => p._id.toString() === item.productId);
                        return { ...item, productDetails: product || null };
                    })
                };
            });

            res.json(ordersWithProducts);
        })

        app.get("/orders", verifyToken, async (req, res) => {
            const email = req.query.email;

            try {
                // Find all orders for the user
                const orders = await ordersCollection.find({ email }).toArray();

                // Extract all product IDs from orders
                const productIds = orders.flatMap(order => order.items.map(item => new ObjectId(item.productId)));

                // Fetch all product details
                const products = await productsCollection.find({ _id: { $in: productIds } }).toArray();

                // Map product details to orders
                const ordersWithProducts = orders.map(order => {
                    return {
                        ...order,
                        items: order.items.map(item => {
                            const product = products.find(p => p._id.toString() === item.productId);
                            return { ...item, productDetails: product || null };
                        })
                    };
                });

                res.json(ordersWithProducts);
            } catch (error) {
                console.error("Error fetching orders:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.post("/orders", verifyToken, async (req, res) => {
            try {
                const orderDetails = req.body;

                if (orderDetails.items[0].cartId) {
                    // Extract cart IDs from order items and convert to ObjectId
                    const cartIds = orderDetails.items.map(item => new ObjectId(item.cartId));

                    // Delete associated carts first
                    const deleteResult = await cartsCollection.deleteMany({
                        _id: { $in: cartIds }
                    });
                }

                // Create the order after successful deletion
                const result = await ordersCollection.insertOne(orderDetails);

                res.send(result);
            } catch (error) {
                console.error("Order processing failed:", error);
                res.status(500).send({
                    success: false,
                    message: "Failed to process order",
                    error: error.message
                });
            }
        });

        app.patch("/orders", verifyToken, verifyAdmin, async (req, res) => {
            try {
                const { orderId, status } = req.body;

                if (!orderId || !status) {
                    return res.status(400).json({ message: "Order ID and Status are required" });
                }

                const result = await ordersCollection.updateOne(
                    { _id: new ObjectId(orderId) },
                    { $set: { status: status } }
                );

                if (result.modifiedCount === 0) {
                    return res.status(404).json({ message: "Order not found or status unchanged" });
                }

                res.status(200).json({ message: "Order status updated successfully" });

            } catch (error) {
                res.status(500).json({ message: "Internal Server Error", error });
            }
        });

        app.delete("/orders/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.send(result);
        })


        // Admin stats 

        // app.get("/admin/stats", async(req, res) => {

        // })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("this server is running")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

