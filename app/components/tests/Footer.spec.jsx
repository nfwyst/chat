import * as React from 'react';
import Footer from '../Footer.jsx';
import  * as renderer from 'react-test-renderer';
import * as manifest from '../../../package.json';
import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe('Footer', () => {
  it('match previously saved snaphsot', () => {
    const tree = renderer.create(<Footer />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('render manifest name', () => {
    const tree = shallow(<Footer />);
    expect(tree.find('footer').length).toBe(1);
    expect(tree.find('footer').text().indexOf(manifest.name)).not.toBe(-1);
  });
});
