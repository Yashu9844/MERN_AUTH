import { useSelector,useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../src/firebase.js';
import { updateFailure,updateStart,updateSuccess ,deleteFailure,deleteSuccess,deleteStart,signOut} from '../src/redux/user/userSlice.js';
export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

const handleChange = (e)=>{
  setFormData({...formData, [e.target.id]:e.target.value})
}
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(updateFailure(data.message));
      return;
    }
    dispatch(updateSuccess(data));
  
  } catch (error) {
    dispatch(updateFailure(error.message));
  }
};

const handleDelete = async (e) => {
  try {
    dispatch(deleteStart());
    const res  = await fetch(`/api/user/delete/${currentUser._id}`,{
      method: 'DELETE',
    }
  

    )

    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteFailure(data.message));
      return;
    }
    dispatch(deleteSuccess(data));
    
  } catch (error) {
    dispatch(deleteFailure(data.message));
  }
}

const handleSignOut = async (e)=>{
  try {
    fetch('/api/auth/signout');
    dispatch(signOut());
    
  } catch (error) {
    
  }
}






  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
        <img
          src={currentUser.avatar}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
     
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>Error uploading image (file size must be less than 2 MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'

          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <button>Update</button>
       
      </form>
      
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer ' onClick={handleDelete}>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
      </div>
    </div>
  );
}