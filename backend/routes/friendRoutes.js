import { Router } from "express";
import { readFriend,sendRequest,ReceivedRequest,pendingRequest,acceptRequest,DenyRequest } from "../controllers/FriendController.js";

const router = Router();
router.get('/searchFriend', readFriend);
router.post('/sendRequest',sendRequest);
router.get('/recievedRequest/:email',ReceivedRequest);
router.get('/pendingRequest/:email',pendingRequest);
router.post('/acceptRequest/:email',acceptRequest);
router.post('/denyRequest/:email',DenyRequest);

export default router;
