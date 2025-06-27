import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxioxSecure/useAxiosSecure";
import { Helmet } from "react-helmet";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = image_hosting_key
    ? `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
    : null;

const AdminAddProduct = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const categoryOptions = {
        prayer: {
            essentials: ["Quran", "Prayer Mat (Jainamaz)", "Prayer Beads (Tasbih)", "Qibla Compass", "Azan Clock"],
            accessories: ["Digital Quran", "Pocket Quran", "Islamic Audio Player", "Quran Stand (Rehal)"],
        },
        personal_care: {
            hygiene: ["Miswak (Tooth Stick)", "Halal Toothpaste", "Halal Soap", "Halal Shampoo"],
            fragrance: ["Halal Perfume (Attar)", "Oud (Incense)"],
            grooming: ["Beard Oil", "Kohl (Surma)", "Halal Skincare Products", "Halal Deodorant"],
        },
        clothing: {
            men: ["Thobe (Jubba)", "Islamic Caps (Taqiyah/Kufi)", "Ihram Clothing"],
            women: ["Hijab", "Abaya", "Prayer Dress", "Modest Swimwear"],
            accessories: ["Islamic Socks", "Halal Nail Polish", "Shawl with Islamic Calligraphy"],
        },
        home_decor: {
            artwork: ["Islamic Calligraphy Frame", "Islamic Wall Art", "Arabic Calligraphy Stickers"],
            utility: ["Islamic Wall Clock", "Islamic Calendar", "Mosque-Shaped Night Lamp"],
        },
        kitchen: {
            food: ["Zamzam Water", "Dates (Ajwa, Medjool)", "Honey (Sunnah Honey)", "Olive Oil", "Black Seed Oil"],
            cookware: ["Arabic Coffee Pot (Dallah)", "Islamic Tableware Set"],
        },
        education: {
            kids: ["Islamic Story Books", "Arabic Alphabet Chart", "Interactive Quran Learning Toys"],
            adults: ["Islamic Journals & Planners", "Dua Books", "Quranic Duas Poster"],
        },
        special_occasions: {
            ramadan: ["Ramadan Lantern (Fanous)", "Suhoor & Iftar Meal Planner", "Ramadan Wall Decorations"],
            eid: ["Eid Gift Bags", "Eid Money Envelopes", "Islamic Greeting Cards"],
        },
        travel: {
            essentials: ["Pocket Quran", "Mini Prayer Mat", "Travel Prayer Beads", "Qibla Direction App"],
            car_accessories: ["Islamic Car Stickers", "Car Hanging Islamic Dua", "Islamic Car Air Freshener"],
        },
        miscellaneous: {
            daily_use: ["Islamic Phone Covers", "Islamic Keychains", "Islamic Stickers & Badges"],
            luxury: ["Islamic Fragrance Diffusers", "Halal Candles", "Personalized Arabic Name Necklaces"],
        },
    };

    const handleSectionChange = (e) => {
        const selectedSection = e.target.value;
        const newSubcategories = Object.keys(categoryOptions[selectedSection] || []);
        setSubcategories(newSubcategories);
        setCategories([]);
    };

    const handleSubcategoryChange = (e) => {
        const selectedSection = document.getElementById("section").value;
        const selectedSubcategory = e.target.value;

        if (selectedSection && selectedSubcategory) {
            setCategories(categoryOptions[selectedSection]?.[selectedSubcategory] || []);
        } else {
            setCategories([]);
        }
    };

    const [useBackup, setUseBackup] = useState(false);

    const onSubmitMain = async (data) => {
        if (!image_hosting_api) {
            Swal.fire({
                icon: "error",
                title: "Configuration Error",
                text: "Image hosting key is missing.",
            });
            return;
        }

        try {
            const imageFile = new FormData();
            imageFile.append("image", data.image[0]);

            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                const productDetails = {
                    image: res.data.data.display_url,
                    productName: data.productName,
                    productDescription: data.productDescription,
                    price: parseFloat(data.price),
                    brand: data.brand,
                    section: data.section,
                    subcategory: data.subcategory,
                    category: data.category,
                };

                const productRes = await axiosSecure.post("/products", productDetails);

                if (productRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Product added successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "There was an error while adding the product.",
            });
        }
    };

    const onSubmitBackup = async (data) => {
        const productDetails = {
            image: data.image,
            productName: data.productName,
            productDescription: data.productDescription,
            price: parseFloat(data.price),
            brand: data.brand,
            section: data.section,
            subcategory: data.subcategory,
            category: data.category,
        };

        const productRes = await axiosSecure.post("/products", productDetails);

        if (productRes.data.insertedId) {
            reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Product added successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "There was an error while adding the product.",
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Add Products</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Add Products</p>
            </div>

            <div className="flex justify-center items-center mb-5">
                <button
                    type="button"
                    onClick={() => setUseBackup(!useBackup)}
                    className="bg-[#013a2c] hover:text-[#013a2c] btn rounded-md text-white font-medium text-lg py-2"
                >
                    {useBackup ? "Switch to Submit Photo" : "Switch to Submit Photo Link"}
                </button>
            </div>

            <div className="mx-auto p-6 shadow-lg rounded-lg bg-white">
                <form onSubmit={handleSubmit(useBackup ? onSubmitBackup : onSubmitMain)} className="space-y-4">
                    {/* Image Input Field */}
                    <div className="form-control">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">
                                    {useBackup ? "Product Image URL" : "Upload Product Photo"}
                                </span>
                            </div>
                            <input
                                {...register("image", { required: "Image is required" })}
                                type={useBackup ? "text" : "file"}
                                className={`w-full max-w-xs p-2 mt-1 border-2 ${useBackup
                                        ? "input input-bordered"
                                        : "file-input file-input-bordered"
                                    } ${errors.image ? "border-red-500 input-error" : ""}`}
                            />
                            {errors.image && (
                                <span className="text-red-500 text-sm">{errors.image.message}</span>
                            )}
                        </label>
                    </div>

                    {/* Price Field */}
                    <div className="form-control">
                        <label htmlFor="price" className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            id="price"
                            type="text"
                            {...register("price", { required: "Price is required" })}
                            className={`input input-bordered ${errors.price ? "input-error" : ""}`}
                        />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>

                    {/* Product Name Field */}
                    <div className="form-control">
                        <label htmlFor="productName" className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input
                            id="productName"
                            type="text"
                            {...register("productName", { required: "Product Name is required" })}
                            className={`input input-bordered ${errors.productName ? "input-error" : ""}`}
                        />
                        {errors.productName && <span className="text-red-500 text-sm">{errors.productName.message}</span>}
                    </div>

                    {/* Product Description Field */}
                    <div className="form-control">
                        <label htmlFor="productDescription" className="label">
                            <span className="label-text">Product Description</span>
                        </label>
                        <textarea
                            id="productDescription"
                            type="text"
                            {...register("productDescription", { required: "Product Description is required" })}
                            className={`textarea textarea-bordered w-full h-40 ${errors.productDescription ? "input-error" : ""}`}
                        />
                        {errors.productDescription && <span className="text-red-500 text-sm">{errors.productDescription.message}</span>}
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                        {/* Section Field */}
                        <div className="form-control">
                            <label htmlFor="section" className="label">
                                <span className="label-text">Main Category</span>
                            </label>
                            <select
                                id="section"
                                {...register("section", { required: "Main category is required" })}
                                onChange={handleSectionChange}
                                className={`select select-bordered ${errors.section ? "select-error" : ""}`}
                            >
                                <option value="">Select Main Category</option>
                                {Object.keys(categoryOptions).map((section) => (
                                    <option key={section} value={section}>
                                        {section.replace(/_/g, ' ').toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            {errors.section && <span className="text-red-500 text-sm">{errors.section.message}</span>}
                        </div>

                        {/* Subcategory Field */}
                        <div className="form-control">
                            <label htmlFor="subcategory" className="label">
                                <span className="label-text">Subcategory</span>
                            </label>
                            <select
                                id="subcategory"
                                {...register("subcategory", { required: "Subcategory is required" })}
                                onChange={handleSubcategoryChange}
                                className={`select select-bordered ${errors.subcategory ? "select-error" : ""}`}
                            >
                                <option value="">Select Subcategory</option>
                                {subcategories.map((subcat) => (
                                    <option key={subcat} value={subcat}>
                                        {subcat.replace(/_/g, ' ').toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            {errors.subcategory && <span className="text-red-500 text-sm">{errors.subcategory.message}</span>}
                        </div>
                    </div>

                    {/* Category Field */}
                    <div className="form-control">
                        <label htmlFor="category" className="label">
                            <span className="label-text">Product Type</span>
                        </label>
                        <select
                            id="category"
                            {...register("category", { required: "Product type is required" })}
                            className={`select select-bordered ${errors.category ? "select-error" : ""}`}
                        >
                            <option value="">Select Product Type</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#013a2c] hover:text-[#013a2c] btn rounded-md text-white font-medium text-lg py-2 w-full"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAddProduct;