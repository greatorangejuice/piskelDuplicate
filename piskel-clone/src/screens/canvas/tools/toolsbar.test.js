import Tools from './toolsbar';

describe('rgbToHex', () => {
  it('Should be an instance of Function', () => {
    expect(Tools.prototype.rgbToHex).toBeInstanceOf(Function);
  });

  it('Should return hex', () => {
    const data = [0, 0, 0, 0];
    const result = Tools.prototype.rgbToHex(data);
    expect(result).toEqual('#00000000');
  });
});

describe('State updating', () => {
  it('Should be an instance of Function', () => {
    expect(Tools.prototype.addFunctionsInState).toBeInstanceOf(Function);
  });

  it('Should return object', () => {
    const newEvent = 'string';
    const func = 'func';
    const result = Tools.prototype.addFunctionsInState(newEvent, func);
    console.log(Tools.currentToolsListeners.newEvent);
    expect(result).toEqual({ string: 'func' });
  });
});
