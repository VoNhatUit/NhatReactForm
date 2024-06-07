import React from "react";
import { useForm } from "react-hook-form";
import BasicButton from "./BasicButton";
function NhatFormPersional(){
    const [ users, setUsers ] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(5);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    function onDelete(id){
      setUsers(prevState => {
        const newUser = prevState.filter(user => user.id !== id)
        return newUser

      })
    }
    function handleNextPage() {
      setPage(prevState => prevState + 1)
    }
  
    function handPrevPage() {
      setPage(prevState => prevState - 1)
    }
    React.useEffect(() => {
      async function fetchUser() {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}&_page=${page}`);
        const data = await res.json();
        setUsers(data);
      }
      fetchUser();
    }, [page, limit])

    console.log('----------------------------: ')
    console.log('EffectHook: ', {
    users, page
    })
   
    return (
        <>
        <div className="mt-10 sm:mt-0">
    <div className="md:grid md:grid-cols-3 md:gap-6 "> 
        <div className="mt-5 md:mt-0 md:col-span-2 	">
            <form 
                onSubmit={handleSubmit((data)=>{
            //alert(JSON.stringify(data));
            console.log(data);
          const { id, name, username, email, country} = data;
            const user = {
                id,
                name,
                username,
                email,
                country
            }
            setUsers(prevState => [...prevState, user])
         })}>
        <div className="shadow overflow-hidden sm:rounded-md ">
          <div className="px-4 py-5 bg-gray-200	 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">First name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"  
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    {...register("name", {
                      required: true,
                      minLength: 6
                    })}
                />
                {errors?.first_name && <span>Name required</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Last name</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    {...register("username", {
                      required: true,
                      minLength: 3
                    })}
                      />
                    {errors?.username && <span>User name required</span>}

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
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                    className="mt-1 block w-full py-2 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <thead className="text-xs text-gray-700 uppercase bg- dark:bg-gray-5 dark:text-gray-400">
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
                    CITY
                </th>
                <th scope="col" className="px-6 py-3">
                    BUTTON
                </th>
            </tr>
        </thead>
        <tbody>          
        {users.map(user => {
                return (
                    <tr key={user.id} className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.address.city}
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
            })
             
        }
                  
                    
        </tbody>
    </table>
</div>            
    
    <div className="grid  grid-cols-2">
              <div className=" justify-items-center my-2 ml-50 ">
              
                    <BasicButton 
                    text="Previous"
                    onClick={handPrevPage}
                    />

                    <p className=" inline w-14">
                      Page: {page} { ' ' }            
                    </p>
                    <BasicButton
                    text="Next"
                    onClick={handleNextPage}
                  /> 
              </div>

              <div className=" col-end-4">
                <p className=" inline my-2">
                  Limit: {limit}
                </p>
                <BasicButton 
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 mx-2"
                    text="Update limit 10"
                    onClick={() => setLimit(10)}
                /> 
              </div>      
                
</div>
                  
        </>

    )
}
export default NhatFormPersional;