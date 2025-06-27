import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxioxSecure/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AdminUpdateProducts = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const product = useLoaderData();

    const { _id, image, price, productLink, brand, section, category } = product;
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

    useEffect(() => {
        if (section) {
            const mainCategory = section.toLowerCase();
            const subcats = Object.keys(categoryOptions[mainCategory] || {});
            setSubcategories(subcats);
            
            if (category) {
                const selectedSubcategory = Object.entries(categoryOptions[mainCategory])
                    .find(([_, items]) => items.includes(category))?.[0];
                if (selectedSubcategory) {
                    setCategories(categoryOptions[mainCategory][selectedSubcategory]);
                    setValue("subcategory", selectedSubcategory);
                }
            }
        }
    }, [section, category, setValue]);

    const handleSectionChange = (e) => {
        const selectedSection = e.target.value;
        const newSubcategories = Object.keys(categoryOptions[selectedSection] || {});
        setSubcategories(newSubcategories);
        setCategories([]);
        setValue("subcategory", "");
        setValue("category", "");
    };

    const handleSubcategoryChange = (e) => {
        const selectedSection = document.getElementById("section").value;
        const selectedSubcategory = e.target.value;
        
        if (selectedSection && selectedSubcategory) {
            setCategories(categoryOptions[selectedSection]?.[selectedSubcategory] || []);
        } else {
            setCategories([]);
        }
        setValue("category", "");
    };

    const onSubmit = async (data) => {
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

        try {
            const productRes = await axiosSecure.patch(`/products/${_id}`, productDetails);

            if (productRes.data.modifiedCount) {
                reset();
                navigate("/dashboard/manage-products");
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No changes detected",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Update failed",
                text: "There was an error updating the product",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Update Product</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Update Product</p>
            </div>

            <div className="mx-auto p-6 shadow-lg rounded-lg bg-white">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Image URL Field */}
                    <div className="form-control">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Product photo link</span>
                            </div>
                            <input
                                {...register("image", { required: "Image is required" })}
                                type="text"
                                defaultValue={image}
                                className={`input input-bordered w-full ${errors.image ? "border-red-500" : ""}`}
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
                            defaultValue={price}
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
                        {/* Main Category Field */}
                        <div className="form-control">
                            <label htmlFor="section" className="label">
                                <span className="label-text">Main Category</span>
                            </label>
                            <select
                                id="section"
                                {...register("section", { required: "Main category is required" })}
                                onChange={handleSectionChange}
                                className={`select select-bordered ${errors.section ? "select-error" : ""}`}
                                defaultValue={section}
                            >
                                <option value="">Select Main Category</option>
                                {Object.keys(categoryOptions).map((category) => (
                                    <option key={category} value={category}>
                                        {category.replace(/_/g, ' ').toUpperCase()}
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
                                    <option 
                                        key={subcat} 
                                        value={subcat}
                                        selected={subcat === product.subcategory}
                                    >
                                        {subcat.replace(/_/g, ' ').toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            {errors.subcategory && <span className="text-red-500 text-sm">{errors.subcategory.message}</span>}
                        </div>
                    </div>

                    {/* Product Type Field */}
                    <div className="form-control">
                        <label htmlFor="category" className="label">
                            <span className="label-text">Product Type</span>
                        </label>
                        <select
                            id="category"
                            {...register("category", { required: "Product type is required" })}
                            className={`select select-bordered ${errors.category ? "select-error" : ""}`}
                            defaultValue={category}
                        >
                            <option value="">Select Product Type</option>
                            {categories.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
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
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminUpdateProducts;