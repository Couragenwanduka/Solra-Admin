import { FC } from 'react';
import { FaReplyAll } from "react-icons/fa";
import { User } from '../../../signup/api/interface';

interface Component {
    comment: { _id: string; comment: string; user: string; createdAt?: string; replies?: { reply: string; createdAt?: string }[] }[];
    user: User | undefined;
    handleReplyClick: (item: { _id: string; comment: string; user: string; createdAt?: string }) => void;
  
}

const CommentLogic: FC<Component> = ({comment, user, handleReplyClick}) => {
  return (
   <main>
       <div className="h-[30rem] overflow-scroll p-4">
                {comment.map((items, index) => (
                  <div key={index} className="mb-4">
                    {items.user === user?._id ? (
                      // User's message bubble
                     <>
                      <div className="group relative flex flex-row-reverse">
                          <div className="flex flex-col-reverse items-start gap-2 w-fit max-w-[70%] ml-auto p-3 rounded-lg shadow-md bg-blue-500 text-white">
                              {/* Timestamp */}
                              <div className="text-xs text-gray-300 flex-shrink-0">
                              {items.createdAt
                                  ? new Date(items.createdAt).toLocaleString('en-US', {
                                      weekday: 'short',
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric',
                                      second: 'numeric',
                                      hour12: true,
                                  })
                                  : "unknown time"}
                              </div>
      
                              {/* Comment */}
                              <p className="break-words">{items.comment}</p>
                          </div>
      
                          {/* Reply Button (appears on hover) */}
                          <button
                              className="w-7 h-7 flex justify-center items-center bg-peach text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-2 right-2"
                              onClick={() => {
                              // Handle the reply action here
                              handleReplyClick(items as { _id: string; comment: string; user: string; createdAt?: string })
                              }}
                          >
                              <FaReplyAll />
                          </button>
                      </div>
                      {items.replies && items.replies.map((reply, idx) => (
                      <div key={idx} className=" mt-2 bg-blue-400 p-2 rounded-md w-56 ml-auto">
                        <p className="text-sm text-black">reply: {reply.reply}</p>
                        <div className="text-xs text-gray-600">
                          {reply.createdAt
                            ? new Date(reply.createdAt).toLocaleString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                hour12: true,
                              })
                            : "unknown time"}
                        </div>
                      </div>
                    ))}
                    
                     </>
                    ) : (
                      // Other user's message bubble
                     <>
                       <div className="group relative flex flex-row-reverse">
                              <div className=" flex flex-col-reverse items-start gap-2  bg-gray-300 text-black w-fit max-w-[70%] mr-auto p-3 rounded-lg shadow-md relative group">
                              {/* Timestamp */}
                              <div className="text-xs text-black flex-shrink-0">
                                  {items.createdAt
                                  ? new Date(items.createdAt).toLocaleString('en-US', {
                                      weekday: 'short',
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric',
                                      second: 'numeric',
                                      hour12: true,
                                      })
                                  : "unknown time"}
                              </div>
      
                              {/* Comment */}
                              <p className="break-words">{items.comment}</p>
                              </div>
                              {/* Reply Button (appears on hover) */}
                          <button
                              className="w-7 h-7 flex justify-center items-center bg-peach text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-2 left-2"
                              onClick={() => {
                                  handleReplyClick(items as { _id: string; comment: string; user: string; createdAt?: string })
                              }}
                          >
                              <FaReplyAll />
                          </button>
                       </div>
                       {items.replies && items.replies.map((reply, idx) => (
                      <div key={idx} className="mt-2 bg-gray-600 p-2 rounded-md w-56 ml-auto">
                        <p className="text-sm text-black">reply: {reply.reply}</p>
                        <div className="text-xs text-gray-600">
                          {reply.createdAt
                            ? new Date(reply.createdAt).toLocaleString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                hour12: true,
                              })
                            : "unknown time"}
                        </div>
                      </div>
                    ))}
                     </>
                    )}
                  </div>
                ))}
              </div>
   </main>
  )
}

export default CommentLogic
