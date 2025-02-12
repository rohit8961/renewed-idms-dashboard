import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import image from "../../assets/bssaStaff.png";
import { FaDownload } from "react-icons/fa6";

interface StaffData {
    UID: string;
    name: string;
    designation: string;
    mobileNumber: string;
    dob?: string;
    bloodGroup?: string;
    emergencyContactNo?: string;
    photo: string;
}

interface BssaStaffCardProps {
    staffData: StaffData;
}

const BssaStaffCard: React.FC<BssaStaffCardProps> = ({ staffData }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // Convert image URL to Base64
    const toBase64 = (url: string) => {
        return new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous"; // Allow cross-origin images
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL("image/png"));
                } else {
                    reject(new Error("Failed to get canvas context"));
                }
            };
            img.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        if (staffData.photo) {
            toBase64(staffData.photo).then(setProfileImage).catch(console.error);
        }
    }, [staffData.photo]);

    const handleDownloadPDF = async () => {
        if (!profileImage) {
            alert("Profile image is still loading. Please wait...");
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 100)); // Ensure rendering is complete

        if (cardRef.current) {
            html2canvas(cardRef.current, {
                scale: 4, // Capture at high resolution
                useCORS: true,
                logging: false,
            }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");

                // Convert cm to mm (since jsPDF uses mm)
                const cardWidth = 54;  // 5.4 cm = 54 mm
                const cardHeight = 85; // 8.5 cm = 85 mm

                // Create a new PDF with the specific card size
                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: [cardWidth, cardHeight], // Custom size: 5.4 cm x 8.5 cm
                });

                // Adjust image size to fit exactly within the PDF
                pdf.addImage(imgData, "PNG", 0, 0, cardWidth, cardHeight);
                pdf.save(`${staffData.name}-${staffData.UID}.pdf`);
            });
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center relative group cursor-pointer mt-10" onClick={handleDownloadPDF}>
                <div
                    ref={cardRef}
                    className="id-card-preview relative w-[370px] h-[545px] border shadow-lg bg-white"
                >
                    <img src={image} alt="ID Card Template" className="w-full h-full absolute" />

                    {/* Profile Image */}
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="absolute top-[116px] left-[118px] w-[162px] h-[162px] rounded-full border-2 border-white"
                        />
                    )}

                    {/* Staff Details */}
                    <div className="absolute top-[285px] left-[75px] text-black text-[12.5px] font-semibold">
                        <span>UID: {staffData.UID}</span> <br />
                        <span>Name: {staffData.name}</span><br />
                        <span>Designation: {staffData.designation}</span><br />
                        <span>Mobile No: {staffData.mobileNumber}</span><br />
                        <span>DOB: {staffData.dob}</span><br />
                        <span>Blood Group: {staffData.bloodGroup}</span><br />
                        <span>Emergency Contact No: {staffData.emergencyContactNo}</span>
                    </div>
                </div>
                <div className="absolute top-45 right-38 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-red-500 text-7xl">
                        <FaDownload />
                    </button>
                </div>
            </div>
        </>
    );
};

export default BssaStaffCard;
