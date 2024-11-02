interface BotResponseProps{
    message: string
}

const BotResponse = ({message}:BotResponseProps) => {
  return <div className="text-start  text-purple-400  mx-24 text-lg font-bold">{message}</div>
}

export default BotResponse
