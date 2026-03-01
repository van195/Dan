import { useContext , useState} from "react";
import "./Comment.scss";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import moment from "moment"
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Comment = ({postId}) => {

  const [desc, setDesc] = useState();
  const { currentUser } = useContext(AuthContext);

  
  
   //we gonna go throgh db to fetch the whole posts  by sending api request to server
   const fetchUserComment = async () => {
      const res = await axios.get("http://localhost:8800/app/comments?postId=" + postId,
                               
                               {withCredentials:true});
                               return res.data;
                              
    }; 
   


 const addComments = async (newComment) =>{
        const res = await axios.post("http://localhost:8800/app/comments/add", // it send the filename to index.js 50
            newComment,
            {
              withCredentials:true
            }
            
        ); 
    return console.log(res);
};

const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: addComments
    ,
    onSuccess: () => {
      //if anything bad happen it cache the invalidate  to refetch the posts
    queryClient.invalidateQueries({ queryKey: ["user_comments"] });
   },
});




  
const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({desc, postId});//our newcommnet should be a FormData object — not plain JSON so it convart the json file
    setDesc("");                            // newcomment send to backend like object form 
    console.log(desc);
};
  

  //now here we gonna fetch our user post from db right!
  // to make it we gonna use tanStack(react query)
   const { isPending, error, data } = useQuery( 
      { 
        queryKey:['user_comments'],

        queryFn: fetchUserComment,
      }
  );

//comment.profilePic
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser?.Username} alt="" />
        <input type="text" placeholder="write a comment" onChange={(e)=>setDesc(e.target.value)}
        value={desc || ""} />
        <button onClick={handleClick}><SendOutlinedIcon/></button>
      </div>
      { isPending ? "Loding...." : data.map((comment) => (
        <div className="comment" key={comment.id}>
          {comment.profilePic ?(<img src={comment.profilePic} alt="" />) :(<img src={bydefault} alt="" />)
            }
          
          <div className="info">
            <span>{comment.Username}</span>
            <p>{comment.comment_desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comment;