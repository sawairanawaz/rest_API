import { db } from "../firebase/firebase.js"
import { collection, addDoc , getDocs, deleteDoc,updateDoc, doc} from "firebase/firestore";

const userDb = collection(db,"students")


export const getUsers = async(req, res) => {
    const students = await getDocs(userDb);
    const AllStudents = [];
    students.docs.map((doc)=>(AllStudents.push({...doc.data(),id:doc.id})))
    res.send(AllStudents);
}

export const createUser = async(req, res) => {

    const student = req.body;
    await addDoc(userDb,{ ...student});
    res.send(`Student with the name ${user.FirstName} added to the database!`)
}

export const getUser = async(req, res) => {
    const students = await getDocs(collection(db,"students"));
    const AllStudents = [];
    students.docs.map((doc)=>(AllStudents.push({...doc.data(),id:doc.id})))
    const { id } = req.params;
    const FoundUser = AllStudents.find((user) => user.id === id);
    res.send(FoundUser);
}
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const studentDoc = doc(db, "students", id);
        await deleteDoc(studentDoc);
    }
    catch(err){
        console.log(err);
    }
    finally{
        res.send(`Students with id ${id} deleted from the database!`)
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const conDoc = doc(db, "students", id);
    const { FirstName, LastName, Age } = req.body;
    const newStatus = { FirstName:FirstName,LastName:LastName,Age:Age};
    await updateDoc(conDoc, newStatus);
    res.send(`user ${id} has been updated`)

}
