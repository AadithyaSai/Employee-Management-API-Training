import {
  AirbagIgniter,
  AirbagService,
  CrashSensor,
} from "../../services/airbag.service";
import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";

describe("AirbagService", () => {
  let sensorMock: MockProxy<CrashSensor>;
  let igniterMock: MockProxy<AirbagIgniter>;
  let service: AirbagService;

  beforeEach(() => {
    sensorMock = mock<CrashSensor>();
    igniterMock = mock<AirbagIgniter>();
    service = new AirbagService(sensorMock, igniterMock);
  });
  it("deploys airbag when crash occurs", () => {
    // Arrange
    when(sensorMock.isCrashDetected).calledWith().mockReturnValue(true);

    // Act
    const result = service.deployAirbag();

    // Assert
    expect(result).toEqual({ triggered: true, force: 100, timing: 50 });
    expect(sensorMock.isCrashDetected).toHaveBeenCalled();
    expect(igniterMock.trigger).toHaveBeenCalledWith(100, 50);
  });
  it("shouldn't deploy airbag when no crash occurs", () => {
    when(sensorMock.isCrashDetected).calledWith().mockReturnValue(false);

    const result = service.deployAirbag();

    expect(result).toEqual({ triggered: false });
    expect(sensorMock.isCrashDetected).toHaveBeenCalled();
    expect(igniterMock.trigger).not.toHaveBeenCalled();
  });
});
