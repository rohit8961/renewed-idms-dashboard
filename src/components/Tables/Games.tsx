import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axiosWithoutAuth from '../../config/axios';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';

interface Game {
    _id: string;
    name: string;
    activate: boolean;
    isDeleted: boolean;
}
const Games = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Game[]>([])
    const [games, setgames] = useState("")

    console.log(isLoading)


    console.log(data, "data")

    const fetchgames = async () => {
        setIsLoading(true)
        try {
            const res = await axiosWithoutAuth.get("games")
            setData(res.data.data)
        } catch (error) {
            console.error("Error fetching games:", error)
        } finally {
            setIsLoading(false)
        }
    }



    const handleStatusToggle = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to change the status of this games?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, change it!'
        })

        if (result.isConfirmed) {
            try {
                await axiosWithoutAuth.patch(`games/${id}`)
                fetchgames()
                Swal.fire(
                    'Updated!',
                    'The games status has been updated.',
                    'success'
                )
            } catch (error) {
                console.error("Error toggling games status:", error)
                Swal.fire(
                    'Error!',
                    'There was an error updating the games status.',
                    'error'
                )
            }
        }
    };

    const deleteGame = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed) {
            try {
                await axiosWithoutAuth.delete(`games/${id}`)
                setData(data.filter(game => game._id !== id))
                Swal.fire(
                    'Deleted!',
                    'The games has been deleted.',
                    'success'
                )
            } catch (error) {
                console.error("Error deleting games:", error)
                Swal.fire(
                    'Error!',
                    'There was an error deleting the games.',
                    'error'
                )
            }
        }
    }

    const Creategames = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
            if (specialCharPattern.test(games)) {
                toast.error("games name contains special characters.");
                return false;
            }
            const { data } = await axiosWithoutAuth.post("games", { name: games });
            console.log(data, "data")
            if (data.success) {
                toast.success(data.message)
                setgames("")
                fetchgames()
            }
        } catch (error) {
            console.log(error)
        }
    };
    const columns = [
        {
            name: "SL",
            cell: (_row: Game, rowIndex: number) => rowIndex + 1,
            sortable: true,
            width: '5rem'
        },
        {
            name: 'Name',
            cell: (row: any) => (
                <div className="flex items-center gap-3">

                    <p className="hidden text-black dark:text-white sm:block">{row.name}</p>
                </div>
            ),
            sortable: true,
        },

        {
            name: 'Status',
            cell: (row: any) => (
                <button
                    onClick={() => handleStatusToggle(row._id)}
                    className={`px-2 py-1 rounded ${row.activate ? 'bg-green-500' : 'bg-red-500'} text-white`}
                >
                    {row.active ? 'Active' : 'Inactive'}
                </button>
            ),
            sortable: true,
            center: true,
        },
        {
            name: 'Actions',
            cell: (row: any) => (
                <button onClick={() => deleteGame(row._id)}>
                    <FaTrash className="text-red-500" />
                </button>
            ),
            center: true,
        },
    ];

    useEffect(() => {
        fetchgames()
    }, [])
    const customStyles = {
        headCells: {
            style: {
                backgroundColor: 'var(--color-gray-2)',
                color: 'var(--color-black)',
                fontWeight: 'bold',
                textTransform: 'uppercase' as 'uppercase',
            },
        },
        cells: {
            style: {
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-black)',
            },
        },
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between">
                <div>
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        Game List
                    </h4>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={games}
                        onChange={(e) => setgames(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-72"
                        placeholder="Add new games..."
                    />
                    <button
                        onClick={(e) => Creategames(e)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add
                    </button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
                pagination
            />
        </div>
    );
};

export default Games;
