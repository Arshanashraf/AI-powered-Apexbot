interface UserMessageProps{
    message: string
}

const UserMessage = ({message}:UserMessageProps) => {
  return <div className="text-end 2xs:mx-1 xs:mx-10  mx-28 py-3 text-lg font-bold text-blue-400 ">{message}</div>
}

export default UserMessage
