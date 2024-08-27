"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const page = ({ params }) => {
      const { id } = params;  // Extract the dynamic id from the URL

      const [mealInfo, setmealInfo] = useState("");
useEffect(() => {
    const InstructionsApi=async ()=>{
        const response=await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const finalResult=response.data;
        setmealInfo(finalResult.meals[0]);
        console.log(mealInfo)
    }
    InstructionsApi();
 
}, [id])

if (!setmealInfo) return <p>Loading...</p>;


  return (
    <div>
        { !setmealInfo ? "Data Not Found" :
        <div className="mealInfo">
            <img src={mealInfo.strMealThumb}/>
            <div className="info">
                <h1 className='font-extrabold text-5xl pb-5'>{mealInfo.strMeal}</h1>
                <h2 className='font-bold text-3xl pb-5' >Instrcutions</h2>
                <p className='pl-4'>{mealInfo.strInstructions}</p>
            </div>
        </div>
        }
    </div>
  )
}

export default page





















// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const RecipePage = ({ params }) => {
//   const { id } = params;  // Extract the dynamic id from the URL
//   const [recipe, setRecipe] = useState(null);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
//       setRecipe(response.data.meals[0]);
//     };

//     fetchRecipe();
//   }, [id]);

//   if (!recipe) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{recipe.strMeal}</h1>
//       <img src={recipe.strMealThumb} alt={recipe.strMeal} width={400} height={400} />
//       <p>{recipe.strInstructions}</p>
//       <ul>
//         {Object.keys(recipe)
//           .filter((key) => key.startsWith('strIngredient') && recipe[key])
//           .map((key, index) => (
//             <li key={index}>{recipe[key]}</li>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default RecipePage;

