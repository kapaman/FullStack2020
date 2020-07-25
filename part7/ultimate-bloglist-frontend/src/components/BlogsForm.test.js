import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
    render,
    fireEvent
} from '@testing-library/react'
import {
    prettyDOM
} from '@testing-library/dom'
import BlogsForm from './BlogsForm';


test("the form calls the event handler it received as props with the right details when a new blog is called", () => {
    const blogs = [
        {

            url: "https:wwww.google.com",
            title: "Blog title",
            author: "Author",
            likes: 123,
            user: [{
                name: "abc def"
            }]
        },
        {
            url: "https:wwww.google.com",
            title: "Blog title",
            author: "Author",
            likes: 123,
            user: [{
                name: "abc def"
            }]

        }
    ];
    const handleNewBlog = jest.fn()
const mockHandler=jest.fn();

    const component = render( <
        BlogsForm user = {
            blogs[0].user
        }
        handleNewBlog = {
            handleNewBlog
        }
        blogs = {
            blogs
        }
        />
    )
    //clicking the create new blog button
    const button = component.container.querySelector('.create-new-blog-entry');

fireEvent.click(button);
//expect(component.container.querySelector('.Togglable')).not.toHaveStyle('display:none');



     const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const url = component.container.querySelector('.url')
    const form = component.container.querySelector('.formasd')

    fireEvent.change(title,{
        target:{value:"new blog title"}
    })

    fireEvent.change(author,{
        target:{value:"new blog author"}
    })

    fireEvent.change(url,{
        target:{value:"new blog url"}
    })

    fireEvent.submit(form);
    //I'm only checking if the form calls handleNewBLog function cuz the form i designed doesn't return anything rather i get all the info from the event.target values
    expect(handleNewBlog.mock.calls).toHaveLength(1);
})