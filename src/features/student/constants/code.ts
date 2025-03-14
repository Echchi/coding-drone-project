export const HEADER_CODE = `from drone import Drone
drone = Drone()`;

export const FOOTER_CODE = `drone.land()`;

export const PLACEHOLDER_CODE = `# 여기에 드론을 제어하는 코드를 작성하세요
# 예시:
# drone.takeoff()
# drone.move_forward(1)
# drone.turn_right(90)
# drone.land()`;

export const DRONE_COMMAND_DELAYS = {
  takeoff: 4000,
  land: 2000,
  emergency: 2000,
} as const;
