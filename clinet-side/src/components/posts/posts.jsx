import axios from "axios";
import Post from "../post/post";
import "./posts.scss";
import {useQuery} from '@tanstack/react-query'
axios.defaults.withCredentials = true;

const Posts = () => {

   const mareRequest = axios.create(
    {
      baseURL:"http://localhost:8800/app",
      withCredentials:true,
    }
   );


   //we gonna go throgh db to fetch the whole posts  by sending api request to server
   const fetchUserPosts = async (inputs) => {
   const res = await axios.get("http://localhost:8800/app/posts/random",
                                inputs,
                               {withCredentials:true});
    return res.data;
};

//now here we gonna fetch our user post from db right!
// to make it we gonna use tanStack(react query)
const { isPending, error, data } = useQuery( 
  { 
    queryKey:['user_postes'],
    
    queryFn: fetchUserPosts,
  }
);
console.log(data?.map(i => i?.id));

  
  
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>it not gonna work at all: {error.message}</p>;

  

  return <div className="posts">
    { data.map(post => (
      <Post post ={post} key={post.id}/>
    ))
    }
  </div>;
};

export default Posts;