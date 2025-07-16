import { Router } from "express";
import { readFriend,sendRequest,ReceivedRequest } from "../controllers/FriendController.js";

const router = Router();
router.get('/searchFriend', readFriend);
router.post('/sendRequest',sendRequest);
router.get('/recievedRequest/:email',ReceivedRequest)
export default router;
