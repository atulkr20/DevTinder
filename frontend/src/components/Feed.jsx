import axios from "axios";
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {

    const feed = useSelector((store) => store.feed);
console.log("addFeed type:", typeof addFeed);

    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed && feed.length > 0) return; 
        try {
        const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
        dispatch(addFeed(res.data));
        } catch (err) {
            console.error("Error fetching feed " + err.message);
        }
    };

    useEffect(() => {
        getFeed();
    }, [] );
    if(!feed) return;

    if(feed.length<= 0) return <h1>No New User Found</h1>
    return (
  feed && feed.length > 0 ? (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  ) : (
    <p>Loading feed...</p>
  )
);
};
export default Feed;