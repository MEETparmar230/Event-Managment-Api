import express, { Router } from 'express'
import {createEvent, register, singleEvent,cancelRegistration,listUpcomingEvents,eventStats} from '../controllers/eventControler.js'

const router=express.Router()


//create route
router.post('/', createEvent)

//get single event route
router.get('/:id', singleEvent)

//register user route
router.post('/:id/register', register)

//cancel registeration
router.delete('/:id/cancel', cancelRegistration)

//upcoming get route
router.get('/upcoming/all', listUpcomingEvents)

// stats route
router.get('/:id/stats', eventStats)



export default router;