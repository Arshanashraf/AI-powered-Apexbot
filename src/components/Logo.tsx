interface LogoProps{
  width: string
}
function Logo({width= "70%"}:LogoProps) {
  return (
    <div style={{width}}>
      Logo
    </div>
  )
}

export default Logo
