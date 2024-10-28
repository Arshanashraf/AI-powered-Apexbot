interface BotResponseProps{
    message: string
}

const BotResponse = ({message}:BotResponseProps) => {
  return <div>{message}</div>
}

export default BotResponse
