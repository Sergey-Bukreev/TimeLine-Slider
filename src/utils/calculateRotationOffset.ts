export const calculateRotationOffset = (
  activeIndex: number,
  total: number,
  targetAngleDeg: number
) => {
  const anglePerPoint = 360 / total;
  const angleForPoint = anglePerPoint * activeIndex;
  let rotationOffset = targetAngleDeg - angleForPoint;

  if (Math.abs(rotationOffset) === 180) {
    rotationOffset = rotationOffset > 0 ? 180 : -180;
  } else if (rotationOffset > 180) {
    rotationOffset -= 360;
  } else if (rotationOffset < -180) {
    rotationOffset += 360;
  }

  return rotationOffset;
};
