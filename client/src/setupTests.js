import { configure } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import '@testing-library/react/cleanup-after-each';
import 'jest-dom/extend-expect';

configure({ adapter: new Adaptor() });