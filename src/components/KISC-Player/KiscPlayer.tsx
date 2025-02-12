import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axiosWithoutAuth from '../../config/axios';
import BssaStaffCard from './BSSAId';


interface StaffData {
    id: number;
    sl: number;
    name: string;
    UID: string;
    mobileNumber: string;
    email: string;
    sport: string;
    photo: string;
    dob?: string;
    bloodGroup?: string;
    emergencyContactNo?: string;
}





const KiscPlayer: React.FC = () => {
    const [allData, setAllData] = useState<StaffData[]>([]);
    const [selectedStaff, setSelectedStaff] = useState<StaffData | null>(null);

    const fetchData = async () => {
        let apiData: StaffData[] = [];

        try {
            const { data } = await axiosWithoutAuth.get('/idcard-kisc-player');
            if (data.success) {
                apiData = data.data.map((item: StaffData, i: number) => ({
                    id: i + 1,
                    sl: i + 1,
                    name: item.name,
                    UID: item.UID,
                    mobileNumber: item.mobileNumber,
                    email: item.email,
                    sport: item.sport,

                    photo: item.photo,
                    dob: item.dob,
                    bloodGroup: item.bloodGroup,
                    emergencyContactNo: item.emergencyContactNo,

                }));
            }
        } catch (error) {
            console.error(error);
        }
        setAllData(apiData);
    };

    const columns = [
        {
            name: 'SL',
            selector: (row: StaffData) => row.sl,
            width: "3.4rem"
        },
        {
            name: 'Name',
            selector: (row: StaffData) => row.name,
        },
        {
            name: 'UID',
            selector: (row: StaffData) => row.UID,
        },
        {
            name: 'Sport',
            selector: (row: StaffData) => row.sport,
        },
        {
            name: 'Mobile No',
            selector: (row: StaffData) => row.mobileNumber,
        },
        {
            name: 'Email',
            selector: (row: StaffData) => row.email,
        },
        {
            name: 'Image',
            selector: (row: StaffData) => row.photo,
            cell: (row: StaffData) => (
                <div className="flex justify-center">
                    <img src={row.photo} alt="Staff" style={{ height: "100px", width: "100px", margin: "5px" }} />
                </div>
            ),
        },
        {
            name: 'Action',
            cell: (row: StaffData) => (
                <button
                    onClick={() => setSelectedStaff(row)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                >
                    Generate ID
                </button>
            ),
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    return (


        <div className="w-full h-screen md:h-full bg-white overflow-y-auto rounded-2xl p-4" >
            <div>
                <DataTable
                    columns={columns}
                    data={allData}
                    pagination
                    striped
                    className="rounded"
                />
            </div>

            {selectedStaff && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 md:w-96">
                        <button
                            onClick={() => setSelectedStaff(null)}
                            className="absolute top-2 right-2 text-red-500 hover:text-gray-700 text-4xl mb-5"
                        >
                            &times;
                        </button>
                        <BssaStaffCard staffData={selectedStaff} />
                    </div>
                </div>
            )}
        </div>


    );
};

export default KiscPlayer;