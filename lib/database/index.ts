import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI;

// here global is like 'window' object in browsers. Used to check if there is a mongoose object present in global space or not
let cached = (global as any).mongoose || {conn: null, promise: null}; // If there is no mongoose connection then simply set to an Empty object.

export const connectToDatabase = async()=>{
    
if(cached.conn)return cached.conn

if(!MONGODB_URI)throw new Error('MONGODB_URI is missing');

cached.promise = cached.promise || mongoose.connect(MONGODB_URI,{
    dbName: 'evently',
    bufferCommands:false
})

cached.conn = await cached.promise;
return cached.conn;

}
 