"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



const Recipe = () => {
    const [searchtext, setsearchtext] = useState("");
    const [enterMealErrorMessage, setenterMealErrorMessage] = useState("");
    const [dishNotFoundMessage, setdishNotFoundMessage] = useState("")


 const [api, setapi] = useState([])
 const router=useRouter();


 const handleRecipeButton = (idMeal) => {
    console.log("Meal ID:", idMeal);
    router.push(`/Recipe/${idMeal}`); // Navigate to the dynamic recipe page
 
};

    const handleInput = (e) => {
        setsearchtext(e.target.value);
        e.preventDefault();
    }
    const apicall = async () => {
        if(searchtext==""){
            setenterMealErrorMessage("Please Enter a Dish.")
            setapi([])
        }
        
        else{
            const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtext}`);
            const finalRes = res.data;
            console.log(finalRes.meals);
           setenterMealErrorMessage("");
           if(finalRes.meals)
            {
                setapi(finalRes.meals);
                setdishNotFoundMessage("")
            }
            else {

             setdishNotFoundMessage("Recipe not found, Search for another Dish.")
             setapi([])
            }
        }
           
    }

    

    return (
        <>
        <div className="mainDiv">
            <h1 className='font-extrabold text-4xl text-center text-orange-600 font-mono  mb-5 mt-6'>Browse Your Favourite Recipe</h1>
            <div className="searchBar">
        <div className="input-btn-div">
                <input
                    type="text" 
                    value={searchtext}
                    onChange={handleInput}
                />  
            <button onClick={apicall}>Search</button>
            </div>
            </div>

            <h2 className="text-center pt-7">{enterMealErrorMessage}</h2>
            <h2 className="text-center pt-7">{dishNotFoundMessage}</h2>



            <div className="imageCard">
            
                {api.length === 0 ? "" : api.map((curitem, index) => (
                    <div className="mealImg" key={index}>
                        <img src={curitem.strMealThumb} alt={curitem.strMeal} width={400} height={400}/>
                    <div className="layer">
                        <p className="mealname">{curitem.strMeal}</p></div>
                        <button onClick={() => handleRecipeButton(curitem.idMeal)}>Recipe</button> {/* Pass the idMeal */}
                    </div>
                ))}
            </div>  
            </div>    
        </>
    );
};

export default Recipe;
