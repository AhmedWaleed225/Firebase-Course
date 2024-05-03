import logo from './logo.svg';
import './App.css';
import Auth from './Components/auth.js'; // Correct import path
import { db, auth, storage } from './Config/firebase.js'
import { useState, useEffect } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'


function App() {
  const [movieList, setmovieList] = useState([]);

  // new movie states
  const [movieTitle, setmovieTitle] = useState("");
  const [movieDate, setmovieDate] = useState(0);
  const [movieOscar, setmovieOscar] = useState(false);

  // Update Title State

  const [NewMovieTitle, setNewTitle] = useState("")

  // File Upload State

  const [fileUpload, setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "movies")

  const getmovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef)
      const FilteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      console.log(FilteredData);
      setmovieList(FilteredData);
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    getmovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title:movieTitle, 
        releaseDate:movieDate, 
        RecievedAnOscar:movieOscar,
        userId: auth?.currentUser?.uid
      });
      getmovieList();
    } catch (err) {
      console.error(err)
    }
  };
  
  const DeleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc)
  };

  const UpdateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: NewMovieTitle });
  };

  const UploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try {
    await uploadBytes(filesFolderRef, fileUpload);
    } catch(err) {
        console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input placeholder='Movie Title' onChange={(e) => setmovieTitle(e.target.value)}/>
        <input placeholder='Release Date' type='number' onChange={(e) => setmovieDate(Number(e.target.value))}/>
        <input type='checkbox' checked={movieOscar} onChange={(e) => setmovieOscar(e.target.checked)}/>
        <label>Recieved an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) =>(
          <div key={movie.id}> {/* Add a unique key */}
            <h1 style={{color: movie.RecievedAnOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>Data: {movie.releaseDate}</p>
            <button onClick={() => DeleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='New Title' onChange={(e) => setNewTitle(e.target.value)}/>
            <button onClick={() => UpdateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={() => UploadFile()}>Upload File</button>
      </div>
    </div>
  );
}

/*rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow update, delete: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}*/
export default App;
