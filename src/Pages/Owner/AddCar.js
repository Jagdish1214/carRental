import React, { useEffect, useState } from 'react'
import "./addcar.css";
import { assets } from '../assets/assets';
import api from '../../api/axiosConfig';
import { toast} from "react-toastify";
import { useParams } from 'react-router-dom';
const AddCar = () => {

    const [image, setImage] = useState(null);
     const { id } = useParams();
const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    dailyPrice: 0,
    category: "",
    transmission: "",
    fuelType: "",
    seatingcapacity: 0,
    location: "",
    features:"",
    description: "",
    image:""
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
    };


    useEffect(() => {
        if (id) {
            fetchCarById();
        }
    }, [id]);

    const fetchCarById = async () => {
        try {
            const response = await api.get(
                `http://localhost:8080/cars/getCar/${id}`,
                { withCredentials: true }
            );
            const carData = response.data;
            setCar({
                brand: carData.brand || "",
                model: carData.model || "",
                year: carData.year || 0,
                dailyPrice: carData.dailyPrice || 0,
                category: carData.category || "",
                transmission: carData.transmission || "",
                fuelType: carData.fuelType || "",
                seatingCapacity: carData.seatingCapacity || 0,
                location: carData.location || "",
                features: carData.features || "",
                description: carData.description || "",
                image: carData.imageUrl || ""
            });
        } catch (error) {
            toast.error("Failed to load car details");
        }
    };

    const handleAdd = async () => {
        try {
            const formData = new FormData();
            if (image) formData.append("image", image);
            formData.append(
                "car",
                new Blob([JSON.stringify(car)], { type: "application/json" })
            );

            await api.post(
                "http://localhost:8080/cars/add-car",
                formData,
                { withCredentials: true }
            );
            toast.success("Car Added Successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add car");
        }
    };

    // UPDATE car logic
    const handleUpdate = async () => {
    if (!id) {
        toast.error("No car selected for update");
        return;
    }

    try {
        const formData = new FormData();

        // Append image only if user selected a new one
        if (image) formData.append("image", image);

        // Append car JSON as a Blob with name "car" to match @RequestPart("car")
        formData.append(
            "car",
            new Blob([JSON.stringify(car)], { type: "application/json" })
        );

        const response = await api.put(
            `http://localhost:8080/cars/update-car/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // important!
                },
                withCredentials: true,
            }
        );

        toast.success("Car Updated Successfully");
        console.log("Updated car:", response.data);
    } catch (error) {
        console.error(error.response?.data || error);
        toast.error(
            error.response?.data?.message || "Failed to update car"
        );
    }
};



    return (
        <div style={{ marginTop: "100px" }} className="add-car-wrapper">
    <form className="container mt-4 add-car-form"onSubmit={(e)=>e.preventDefault()}
    encType="multipart/form-data">

    <div className='tittle'>
        <h1>Add New Car</h1>
        <p>Fill in details to list a new car for booking, including pricing, availability, and car specifications.</p>
    </div>

    <div className="d-flex align-items-center gap-3 w-100 mb-4 ms-2">
        <label htmlFor="car-image" className="cursor-pointer mb-0">
            <img
            src={image ? URL.createObjectURL(image) : assets.upload_icon}
            alt="upload"
            className="rounded border"
            style={{
                height: "60px",
                width: "85px",
                objectFit: "cover",
                cursor: "pointer",
            }}
            />

            <input
            type="file"
            id="car-image"
            accept="image/*"
            className="d-none"
            onChange={(e) => setImage(e.target.files[0])}
            />
        </label>

        <p className="text-muted mb-0 small">
            Upload a picture of your car
        </p>
    </div>


    <div className="row g-3">

        <div className="col-md-6">
        <label className="form-label mt-2">Brand</label><br></br>
        <input
            type="text"
            name="brand"
            className="form-control"
            value={car.brand}
            onChange={handleChange}
            required
        />
        </div>

        <div className="col-md-6">
        <label className="form-label mt-2">Model</label>
        <input
            type="text"
            name="model"
            className="form-control"
            value={car.model}
            onChange={handleChange}
            required
        />
        </div>

        <div className="col-md-4">
        <label className="form-label">Year</label>
        <input
            type="number"
            name="year"
            className="form-control"
            value={car.year}
            onChange={handleChange}
        />
        </div>

        <div className="col-md-4">
        <label className="form-label">Price Per Day (₹)</label>
        <input
            type="number"
            name="dailyPrice"
            className="form-control"
            value={car.pricePerDay}
            onChange={handleChange}
        />
        </div>

        <div className="col-md-4">
        <label className="form-label">Category</label>
        <select
            name="category"
            className="form-select"
            value={car.category}
            onChange={handleChange}
        >
            <option >Select</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Hatchback">Hatchback</option>
        </select>
        </div>

        <div className="col-md-4">
        <label className="form-label">Transmission</label>
        <select
            name="transmission"
            className="form-select"
            value={car.transmission}
            onChange={handleChange}
        >
            <option >Select</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
            <option value="SemiAutomatic">SemiAutomatic</option>
        </select>
        </div>

        <div className="col-md-4">
        <label className="form-label">Fuel Type</label>
        <select
            name="fuelType"
            className="form-select"
            value={car.fuel_type}
            onChange={handleChange}
        >
            <option >Select</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
        </select>
        </div>

        <div className="col-md-4">
        <label className="form-label">Seating Capacity</label>
        <input
            type="number"
            name="seatingCapacity"
            className="form-control"
            value={car.seating_capacity}
            onChange={handleChange}
        />
        </div>

        <div className="col-md-12">
        <label className="form-label">Location</label>
        <select
            name="location"
            className="form-select"
            value={car.location}
            onChange={handleChange}
        >
            <option >Select</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Nashik">Nashik</option>
            <option value="Delhi">Delhi</option>
            <option value="Banglore">Banglore</option>
        </select>
        </div>

        <div className="col-md-12">
        <label className="form-label">Features</label>
        <input
            type="text"
            name="features"
            className="form-control"
            value={car.features}
            onChange={handleChange}
            required
        />
        </div>


        <div className="col-12">
        <label className="form-label">Description</label>
        <textarea
            name="description"
            className="form-control"
            rows="3"
            value={car.description}
            onChange={handleChange}
        ></textarea>
        </div>

        <div className="col-12 text-center">
         {!id && (
                        <button type="button" className="btn btn-primary px-4 me-3" onClick={handleAdd}>
                            Add Car
                        </button>
                    )}
                    {id && (
                        <button type="button" className="btn btn-success px-4" onClick={handleUpdate}>
                            Update Car
                        </button>
                    )}
        </div>

    </div>
    </form>

        </div>
    )
}

export default AddCar
