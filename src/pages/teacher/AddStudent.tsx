import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import React, { useState, ChangeEvent } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectItem } from "@nextui-org/react";
import { storage } from "../../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { studentSchema } from "../../services/validations/zod";
import { addStudents } from "../../api/user";
import { toast } from "react-toastify";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

type StudentFormData = z.infer<typeof studentSchema>;
interface AddStudentProps {
    onStudentAdded: () => void;
  }
const AddStudent: React.FC<AddStudentProps> = ({ onStudentAdded }) => {
    const user = useSelector((state: RootState) => state.auth.userInfo);
    const teacher = user._id;
    console.log('token user',user._id);
    
    const classes = Array.from({ length: 10 }, (_, i) => ({
        key: i + 1,
        label: `${i + 1} Grade`,
    }));

    const [uploading, setUploading] = useState<boolean>(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        reset
    } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePreview(URL.createObjectURL(file));
            setValue("profilePic", file);
            setProfilePic(file);
        }
    };

    const onSubmit: SubmitHandler<StudentFormData> = async (data) => {
        try {
            setUploading(true);
            if (profilePic) {
                const storageRef = ref(storage, `image/${profilePic.name}`);
                await uploadBytes(storageRef, profilePic);
                const downloadURL = await getDownloadURL(storageRef);
                data.profilePic = downloadURL;
            }
            const formData = {
                ...data,
                teacher,
            };
            console.log(formData);
            
            const response = await addStudents(formData);
            toast.success(response.message);
            reset();  // Reset form fields
            setProfilePreview(null);  
            setProfilePic(null); 
            onStudentAdded();
            onOpenChange(); 
        } catch (error) {
            console.log(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <Button onPress={onOpen}>Add students</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Student Details</ModalHeader>
                            <ModalBody>
                                <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        {/* Profile Picture Upload */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                                                {profilePreview ? (
                                                    <img src={profilePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">+</div>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="profilePic"
                                            />
                                            <label htmlFor="profilePic" className="text-blue-500 cursor-pointer">Upload Profile Picture</label>
                                            {errors.profilePic && <p className="text-red-500 text-sm">{errors.profilePic.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700">Name</label>
                                            <Input
                                                type="text"
                                                {...register("name")}
                                                placeholder="Enter student name"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700">Date of Birth</label>
                                            <input
                                                {...register("dob")}
                                                type="date"
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700">Age</label>
                                            <Input
                                                {...register("age")}
                                                type="number"
                                                placeholder="Enter student age"
                                            />
                                            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                                        </div>

                                        <div>
                                            <Controller
                                                name="className"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <Select
                                                        label="Select Class"
                                                        placeholder="Select a class"
                                                        className="max-w-xs"
                                                        selectedKeys={field.value ? [field.value] : []}
                                                        onSelectionChange={(selected) =>
                                                            field.onChange(Array.from(selected)[0])
                                                        }
                                                    >
                                                        {classes.map((classItem) => (
                                                            <SelectItem key={classItem.key} value={classItem.key.toString()}>
                                                                {classItem.label}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                            {errors.className && (
                                                <p className="text-red-500 text-sm">{errors.className.message}</p>
                                            )}
                                        </div>

                                        <button
                                            disabled={uploading}
                                            type="submit"
                                            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200"
                                        >
                                            {uploading ? 'Uploading...' : 'Submit'}
                                        </button>
                                    </form>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddStudent;
