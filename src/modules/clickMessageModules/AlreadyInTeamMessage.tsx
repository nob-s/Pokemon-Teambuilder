interface AlreadyInTeamMessageProps {
  clickMessage: {
    text: string,
    x: number,
    y: number,
  }
}

export const AlreadyInTeamMessage: React.FC<AlreadyInTeamMessageProps> = ({ clickMessage }) => {
  return (
    <>
      <div
        className="fixed text-white bg-black px-3 py-1 rounded pointer-events-none"
        style={{
          left: clickMessage.x,
          top: clickMessage.y
        }}
      >
        {clickMessage.text}
      </div>
    </>
    );

}