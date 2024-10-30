interface UserMessageProps{
    message: string
}

const UserMessage = ({message}:UserMessageProps) => {
  return <div className="text-end  mx-28 py-3 text-lg font-bold text-red-600 ">{message}</div>
}

export default UserMessage
