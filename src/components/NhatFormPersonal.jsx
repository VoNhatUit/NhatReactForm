import React, { useState } from "react";
import { useForm } from "react-hook-form";

function NhatFormPersional(){
    const [ users, setUsers ] = React.useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    function onSubmit(e){
        e.preventDefault();
    }
    function onDelete(id){
      setUsers(prevState => {
        const newUser = prevState.filter(user => user.id !== id)
        return newUser

      })

    }
    return (
        <>
        <div className="mt-10 sm:mt-0">
    <div className="md:grid md:grid-cols-3 md:gap-6 "> 
        <div className="mt-5 md:mt-0 md:col-span-2 	">
            <form 
                onSubmit={handleSubmit((data)=>{
            //alert(JSON.stringify(data));
            console.log(data);
          const { first_name, last_name, email, country} = data;
            const user = {
                id: Date.now(),
                first_name,
                last_name,
                email,
                country
            }
            setUsers(prevState => [...prevState, user])
         })}>
        <div className="shadow overflow-hidden sm:rounded-md ">
          <div className="px-4 py-5 bg-sky-100	 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First name</label>
                <input 
                    type="text" 
                    name="first_name" 
                    id="first_name"  
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    {...register("first_name", {
                      required: true,
                      minLength: 6
                    })}
                />
                {errors?.first_name && <span>First name required</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last name</label>
                <input 
                    type="text" 
                    name="last_name" 
                    id="last_name" 
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    {...register("last_name", {
                      required: true,
                      minLength: 3
                    })}
                      />
                    {errors?.last_name && <span>Last name required</span>}

              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email address</label>
                <input 
                    type="text" 
                    name="email_address" 
                    id="email_address" 
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    {...register("email", {
                      required: true,
                      minLength: {
                        value: 6,
                        message: "Email required"
                      },
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Email isn't correct format @abc.com"
                      }
                    }
                    )}/>
                    {errors?.email?.message}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region</label>
                <select 
                    id="country" 
                    name="country"  
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register("country")}>
                  <option value="US">United States</option>
                  <option value="Ca">Canada</option>
                  <option value="Mex">Mexico</option>
                </select>
              </div>             
              
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button 
                type="submit" 
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>



<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2">
        <thead className="text-xs text-gray-700 uppercase bg-sky-100 dark:bg-gray-5 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   FIRST NAME
                </th>
                <th scope="col" className="px-6 py-3">
                    LAST NAME
                </th>
                <th scope="col" className="px-6 py-3">
                    EMAIL
                </th>
                <th scope="col" className="px-6 py-3">
                    COUNTRY
                </th>
                <th scope="col" className="px-6 py-3">
                    BUTTON
                </th>
            </tr>
        </thead>
        <tbody>
            {users?.length >0 ? users.map(user => {
                return (
                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.first_name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.last_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.country}
                                    </td>
                                    <td className="px-6 py-4">
                                      <button 
                                        type="button" 
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                                    </td>
                                </tr>
                )
            }) : (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                No Data
            </th>
            </tr>

            )
        }
            
           
        </tbody>
    </table>
</div>

        </>

    )
}
export default NhatFormPersional;