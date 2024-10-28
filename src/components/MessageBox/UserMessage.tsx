interface UserMessageProps{
    message: string
}

const UserMessage = ({message}:UserMessageProps) => {
  return <div>{message}</div>
}

export default UserMessage
