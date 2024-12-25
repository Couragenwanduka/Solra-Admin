import { FC } from 'react'
import { useUser } from '../../../../hooks/userDetails'


interface Component {
  status: string | undefined;
  blogId: string;
  handleStatusChange: (id: string, newStatus: string) => void;
}
const StatusButton: FC<Component> = ({status, blogId, handleStatusChange}) => {
    const { user} = useUser()
  return (
    <main>
         {user?.role === 'Chief Editor' || user?.role === 'Developer' ? (
        <div className="flex justify-center items-center h-28 gap-2 md:gap-8 border-t border-b border-r border-borderColor">
          {status === 'approved' ? (
            <span className="text-green-700 flex justify-center items-center rounded-3xl border border-borderColor w-20 md:w-28 h-10 cursor-pointer">
              Approved
            </span>
          ) : (
            <span
              className="text-text-colour flex justify-center items-center rounded-3xl border border-borderColor w-20 md:w-28 h-10 cursor-pointer"
              onClick={() => handleStatusChange(blogId, 'approved')}
            >
              Approved
            </span>
          )}
          {status === 'pending' ? (
            <span className="text-yellow-700 flex justify-center items-center rounded-3xl border border-borderColor w-20 md:w-28 h-10">
              Pending
            </span>
          ) : (
            <span
              className="text-text-colour flex justify-center items-center rounded-3xl border border-borderColor w-20 md:w-28 h-10"
              onClick={() => handleStatusChange(blogId, 'pending')}
            >
              Pending
            </span>
          )}
          {status === 'rejected' ? (
            <span className="text-red-700 flex justify-center items-center rounded-3xl border border-borderColor w-20 md:w-28 h-10">
              Rejects
            </span>
          ) : (
            <span
              className="text-text-colour flex justify-center items-center rounded-3xl border border-borderColor w-20 md:w-28 h-10"
              onClick={() => handleStatusChange(blogId, 'rejected')}
            >
              Rejects
            </span>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-28 gap-4 md:gap-8 border-t border-b border-r border-borderColor">
          {status === 'approved' ? (
            <span className="text-green-500">Approved</span>
          ) : (
            <span className="text-gray-500">Approved</span>
          )}
          {status === 'pending' ? (
            <span className="text-yellow-500">Pending</span>
          ) : (
            <span className="text-gray-500">Pending</span>
          )}
          {status === 'rejected' ? (
            <span className="text-red-500">Rejects</span>
          ) : (
            <span className="text-gray-500">Rejects</span>
          )}
        </div>
      )}
    </main>
  )
}

export default StatusButton
