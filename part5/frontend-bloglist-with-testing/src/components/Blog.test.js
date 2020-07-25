import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog';



test("by default only title and author are displayed",()=>{
    const blog={
        url:"https:wwww.google.com",
        title:"Blog title",
        author:"Author",
        likes:123,
        user:[{name:"abc def"}]
    };



    const component = render(
    <Blog blog={blog}/>
    )

    expect(component.container).toHaveTextContent('Blog title by Author')
})

test("by default url and likes are not displayed",()=>{
    const blog={
        url:"https:wwww.google.com",
        title:"Blog title",
        author:"Author",
        likes:123,
        user:[{name:"abc def"}]
    };



    const component = render(
    <Blog blog={blog}/>
    )

    expect(component.container.querySelector('.Togglable')).toHaveStyle('display: none');
})


test("clicking the button calls the stylechange function",()=>{
    const blog={
        url:"https:wwww.google.com",
        title:"Blog title",
        author:"Author",
        likes:123,
        user:[{name:"abc def"}]
    };
    
    const component = render(
    <Blog blog={blog}/>
    )
     const button = component.getByText('view')
     fireEvent.click(button);

     const div = component.container.querySelector('.Togglable')
     expect(div).not.toHaveStyle('display:none')

})


test("like button pressed twice is registered twice",()=>{
    const blog={
        url:"https:wwww.google.com",
        title:"Blog title",
        author:"Author",
        likes:123,
        user:[{name:"abc def"}]
    };

    const mockHandler=jest.fn();

    const component = render(
    <Blog blog={blog} handleLike={mockHandler}/>
    )
    const button = component.getByText('like');
    console.log(prettyDOM(button));
        fireEvent.click(button);
        fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
})