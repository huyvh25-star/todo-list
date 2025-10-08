const Footer = ({ completedTaskCount = 0, activetedTaskCount = 0 }) => {
  return (
    <>
      {completedTaskCount + activetedTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTaskCount > 0 && (
              <>
                🔥 Tuyệt vời bạn đã hoàn thành {completedTaskCount} việc !
                {activetedTaskCount > 0 &&
                  ` còn ${activetedTaskCount} nữa thôi !`}
              </>
            )}
            {completedTaskCount === 0 && activetedTaskCount > 0 && (
              <>Hãy bắt đầu làm {activetedTaskCount} nhiệm vụ nào !</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
