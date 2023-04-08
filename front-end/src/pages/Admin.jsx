import { Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Input, Button, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import NavbarComp from "../components/NavbarComp";
import { UserGroupIcon, BookOpenIcon  } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import BooksTable from '../components/BooksTable';

function Admin() {
  const [usersList, setUserslist] = useState([])
  const [userEditDialog, setUserEditDialog] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [responseDialog, setResponseDialog] = useState(false);
  const [serverResponse, setServerResponse] = useState({data: 'Loading..'});
  const [responseLoading, setResponseLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(-1);
  
  const axiosPrivate = useAxiosPrivate()

  const getUsers = async () => {
    try {
      const res = await axiosPrivate.get('/api/users')
      setUserslist(res.data.usersData.usersArray)  
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditUser = async () => {
    setResponseLoading(true)
    setUserEditDialog(false)
    setResponseDialog(true)
    try {
      const res = await axiosPrivate.put('/api/users', {
        ...editedUserData
      })           
      setServerResponse('Request Accepted')
      getUsers()
    } catch (error) {
      console.log(error)
      setServerResponse(`${error.message}`)
    }
    setResponseLoading(false)
  }

  const handleDeleteUser = () => {
    setResponseLoading(true)
    setDeleteDialog(false)
    setResponseDialog(true)
    try {
      const res = axiosPrivate.delete('/api/users', {
        params: {
          id: deleteUserId
        }
      })
      setServerResponse('Request Accepted')
      getUsers()
      setResponseDialog(true)
    } catch (error) {
      console.log(error)
      setServerResponse(`${error.message}`)
    }
    setResponseLoading(false)
  }

  const handleDeleteDialog = (id) => {
    setDeleteUserId(id)
    setDeleteDialog(true)
  }

  const handleEditDialog = (index) => {
    setEditedUserData({...usersList[index] })
    setUserEditDialog(true)
  }

  const onEditedUserChange = (ev) => {
    setEditedUserData(prev => ({...prev, [ev.target.name]: ev.target.value}))
  }

  useEffect(() => {
    const userTab = document.getElementById('usersTab')
    userTab.click()

    getUsers()
  }, [])

  return (
    <div className=" flex flex-col">
      <NavbarComp></NavbarComp>

      <div className=" text-center p-5">
        <Typography variant="h2">
          Admin Panel
        </Typography>
        <hr className=' w-28 mx-auto bg-blue-400 h-2 my-1'></hr>
      </div>

      <div className=" w-full h-screen">
        <Tabs value="dashboard" className=" block">
          <TabsHeader className=" max-w-sm mx-auto">
              <Tab value='Users' key={'Users'} id="usersTab">
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5"></UserGroupIcon>
                  Users
                </div>
              </Tab>
              <Tab value='Books' key={'Books'}>
                <div className="flex items-center gap-2">                  
                  <BookOpenIcon className="w-5 h-5"></BookOpenIcon>
                  Books
                </div>
              </Tab>
          </TabsHeader>
          <TabsBody>
              <TabPanel value="Users" className="flex justify-center">
                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg max-w-5xl w-full">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-blue-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 ">
                                  Action
                                  <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {user.id}
                                  </th>
                                  <td scope="row" className="px-6 py-4 ">
                                      {user.name}
                                  </td>
                                  <td className="px-6 py-4">
                                      {user.email}
                                  </td>
                                  <td className="px-6 py-4">
                                      {user.roles}
                                  </td>
                                  <td className="px-6 py-4 ">
                                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2" onClick={() => {handleEditDialog(index)}}>Edit</a>
                                      <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => {handleDeleteDialog(user.id)}} >Delete</a>
                                  </td>
                                </tr>                                 
                              )) 
                            }                           
                        </tbody>
                    </table>
                </div>                
              </TabPanel>
              <TabPanel value="Books" className="flex justify-center ">
                <BooksTable setResponseLoading={setResponseLoading} setResponseDialog={setResponseDialog} setServerResponse={setServerResponse} setDeleteDialog={setDeleteDialog}></BooksTable>
              </TabPanel>
          </TabsBody>
        </Tabs>        

        <Dialog open={userEditDialog} size="xxl" handler={() => {setUserEditDialog(!userEditDialog)}} className="flex flex-col justify-center p-4">
          <DialogHeader className="text-center inline">Edit User</DialogHeader>

          <DialogBody className=" grid grid-cols-1 md:grid-cols-2  self-center w-full xl:w-2/3">
            <div className="p-2">
              <Typography>User ID</Typography>
              <Input value={editedUserData.id} disabled name="id" onChange={onEditedUserChange}></Input>
            </div>
            <div className="p-2">
              <Typography>User Email</Typography>
              <Input value={editedUserData.email} disabled name="email" onChange={onEditedUserChange}></Input>
            </div>
            <div className="p-4">              
              <Input label='User Name' variant="static" placeholder="Name" value={editedUserData.name} name="name" onChange={onEditedUserChange}></Input>
            </div>
            <div className="p-4">              
              <Input label='User Role' variant="static" placeholder="Role" value={editedUserData.roles} name="roles" onChange={onEditedUserChange}></Input>
            </div>

          </DialogBody>

          <DialogFooter className=" justify-center">
            <Button variant="text" color="red" onClick={() => setUserEditDialog(!userEditDialog)} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="blue" onClick={() => handleEditUser()}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>      

        <Dialog open={responseDialog} size="xl" handler={() => {setResponseDialog(!responseDialog)}} className="flex flex-col justify-center p-4">
          <DialogHeader className="text-center inline">Server Response</DialogHeader>

          <DialogBody className=" self-center w-full xl:w-2/3 text-center">
            {
              responseLoading
              ? (<div role="status " className={`${responseLoading? '' : 'hidden'} m-auto flex justify-center `}>
                    <svg aria-hidden="true" class="inline w-20  mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>)
              : (serverResponse)
            }
          </DialogBody>

          <DialogFooter className=" justify-center">
            <Button variant="gradient" color="blue" onClick={() => {setResponseDialog(!responseDialog)}}>
              <span>Ok</span>
            </Button>
          </DialogFooter>
        </Dialog>   

        <Dialog open={deleteDialog} size="lg" handler={() => {setDeleteDialog(!deleteDialog)}} className="flex flex-col justify-center p-4">
          <DialogHeader className="text-center inline">Confirm Deletion</DialogHeader>

          <DialogBody className="  self-center text-center w-full">
            Apakah anda yakin akan menghapus User ini?
          </DialogBody>

          <DialogFooter className=" justify-center">
            <Button variant="text" color="red" onClick={() => setDeleteDialog(!deleteDialog)} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="blue" onClick={() => handleDeleteUser()}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>      

      </div>
    </div>
  )
}

export default Admin