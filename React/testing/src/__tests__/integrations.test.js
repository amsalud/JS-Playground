import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
    // Turn off requests from axios
    moxios.install();
    // Intercept this request URL
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [
            { name: 'Fetched # 1' }, { name: 'Fetched # 2' }
        ]
    });
});

afterEach(() => {
    // Cleanup stub requests
    moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
    // Attempt to render the entire app
    const wrapper = mount(
        <Root>
            <App />
        </Root>
    );

    // find the Fetch Coments button and click it
    wrapper.find('.fetch-comments').simulate('click');

    // Set a timeout
    // Expect to find a list of comments
    setTimeout(()=>{
        wrapper.update();
        expect(wrapper.find('li').length).toEqual(2);
        done();
        wrapper.unmount();
    },100);
});