import { useUser } from "../../../../hooks/userDetails";
import { FC, useState, useEffect } from 'react';
import apiFunctions from "../../../api";
import { useMutation, useQuery } from '@tanstack/react-query';
import StatusButton from "./statusButton";
import CommentLogic from "./comment";

interface Component {
  status: string | undefined;
  blogId: string;
}

const ReadPageApproveSection: FC<Component> = ({ status: initialStatus, blogId }) => {
  const { user } = useUser();
  const [status, setStatus] = useState(initialStatus); // Local state for status
  const [inputValue, setInputValue] = useState('');
  const [replyInputValue, setReplyInputValue] = useState('');
  const [comment, setComment] = useState<{
    _id: string;
    comment: string;
    user: string;
    createdAt?: string;
    replies?: { reply: string; createdAt?: string }[];
  }[]>([]);
  const [replyTo, setReplyTo] = useState<{
    _id: string;
    comment: string;
    user: string;
    createdAt?: string;
    replies?: { reply: string; createdAt?: string }[];
  } | null>(null);

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => apiFunctions.PostStatusUpdate(id, status),
    onSuccess: (variables) => {
      setStatus(variables.updatedBlog.status); // Update local state when mutation succeeds
      console.log('Article status updated successfully', variables.updatedBlog.status);
    },
  });

  const replyMutation = useMutation({
    mutationFn: ({ commentId, reply, userId }: { commentId: string, reply: string, userId: string }) =>
      apiFunctions.addReply(commentId, reply, userId),
    onSuccess: (variables) => {
      console.log('Reply created successfully', variables.reply);
    },
  });

  const { data } = useQuery({
    queryKey: ['blogComment', blogId],
    queryFn: () => apiFunctions.getCommentByBlogId(blogId),
    refetchInterval: 1000, // Refetch every second when data is not available
  });

  useEffect(() => {
    if (data) {
      setComment(data.comment);
    }
  }, [data]);

  const commentMutation = useMutation({
    mutationFn: ({ postId, content, userId }: { postId: string, content: string, userId: string }) =>
      apiFunctions.CreateComment(postId, content, userId),
    onSuccess: (variables) => {
      console.log('Comment created successfully', variables.comment);
    },
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    mutation.mutate({ id, status: newStatus });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    commentMutation.mutate({ postId: blogId, content: inputValue, userId: user?._id });
    setInputValue('');
  };

  const handleReplySubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (replyTo) {
      replyMutation.mutate({ commentId: replyTo._id, reply: replyInputValue, userId: user?._id });
    }
    setReplyInputValue('');
    setReplyTo(null); // Reset replyTo after submission
  };

  const handleReplyClick = (comment: { _id: string; comment: string; user: string; createdAt?: string }) => {
    setReplyTo(comment); // Set the comment that the user is replying to
  };

  return (
    <main className="w-full font-inter">
      <div>
        <StatusButton
          status={status}
          blogId={blogId}
          handleStatusChange={handleStatusChange}
        />
      </div>

      <div className="h-[35rem] flex flex-col justify-between w-full">
        <div>
          <CommentLogic
            comment={comment}
            user={user}
            handleReplyClick={handleReplyClick}
          />
        </div>

        <div>
          {replyTo ? (
            <div className="mt-2 text-gray-700 p-1 rounded-md">
              <div className="flex justify-between mr-2">
                <p className="font-bold text-sm text-blue-500">Replying to {replyTo.comment}</p>
                <p className="text-white cursor-pointer" onClick={() => setReplyTo(null)}>
                  X
                </p>
              </div>
              <div className="relative w-full p-1">
                <textarea
                  placeholder="Enter your comments"
                  className="mb-2 p-2 border border-text-colour/50 rounded bg-transparent w-full pr-20 h-14 focus:outline-none placeholder:text-text-colour text-text-colour resize-none"
                  value={replyInputValue}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setReplyInputValue(event.target.value)
                  }
                />
                <button
                  className="absolute right-0 top-0 mt-3 mr-3 p-2 bg-peach text-white rounded disabled:bg-muted-peach"
                  onClick={handleReplySubmit}
                  disabled={replyInputValue === ''}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full p-1">
              <textarea
                placeholder="Enter your comments"
                className="mb-2 p-2 border border-text-colour/50 rounded bg-transparent w-full pr-20 h-14 focus:outline-none placeholder:text-text-colour text-text-colour resize-none"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                className="absolute right-0 top-0 mt-3 mr-3 p-2 bg-peach text-white rounded disabled:bg-muted-peach"
                onClick={handleSubmit}
                disabled={inputValue === ''}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ReadPageApproveSection;
