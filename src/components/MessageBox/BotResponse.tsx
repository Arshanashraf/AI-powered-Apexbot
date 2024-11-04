interface BotResponseProps{
    message: string
}

const BotResponse = ({message}:BotResponseProps) => {
  return <div className="text-start  text-purple-400 2xs:mx-1 xs:mx-10  mx-24 text-lg font-bold">{message}</div>
}

export default BotResponse
