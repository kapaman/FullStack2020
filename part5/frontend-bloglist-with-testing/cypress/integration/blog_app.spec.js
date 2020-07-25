
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('login').click()
      cy.contains('username')
      cy.contains('password')
      cy.contains('cancel')
    })

    describe('Blog app logging in',function(){
        beforeEach(function(){
            cy.request('POST','http://localhost:3001/api/testing/reset')
            cy.request('POST','http://localhost:3001/api/users',{name:"nohope xd",username:"nohopexd",password:"nohopexd"})
           
            cy.visit('http://localhost:3000')
        })
    

        it('Can not login with incorrect creds',function(){
            cy.contains('login').click();
            cy.get('#username').type('nohope')
            cy.get('#password').type('nohope')
            cy.get('#submit').click()
     
            cy.contains('Wrong username/password').should('have.css', 'border', '2px solid rgb(255, 0, 0)')
         })
        it('Can login with correct creds',function(){
           cy.contains('login').click();
           cy.get('#username').type('nohopexd')
           cy.get('#password').type('nohopexd')
           cy.get('#submit').click()
    
           cy.contains('logged in as nohopexd')
        })
        
    
    
      })


      describe.only('When logged in', function() {
        beforeEach(function() {
            cy.request('POST','http://localhost:3001/api/testing/reset')
            cy.request('POST','http://localhost:3001/api/users',{name:"nohope xd",username:"nohopexd",password:"nohopexd"})
            cy.visit('http://localhost:3000/api/blogs')
            cy.contains('login').click();
            cy.get('#username').type('nohopexd')
            cy.get('#password').type('nohopexd')
            cy.get('#submit').click()
            cy.contains('create new blog entry').click()
            cy.get('.author').type('nohopexd')
            cy.get('.url').type('nohopexd')
            cy.get('.title').type('nohopexd');
            cy.get('#create-blog').click();
            cy.get('.author').type('nohopexd2')
            cy.get('.url').type('nohopexd2')
            cy.get('.title').type('nohopexd2');
            cy.get('#create-blog').click();
            cy.get('.author').type('nohopexd3')
            cy.get('.url').type('nohopexd3')
            cy.get('.title').type('nohopexd3');
            cy.get('#create-blog').click();
        })
    
        it('A blog can be created', function() {
            
            cy.contains('blog nohopexd was saved')
        })
        it('A blog can be liked', function() {
        

            cy.contains('view').click()
            cy.get('.like').first().click();
           
           
        })
        it('A blog can be deleted', function() {
          cy.get('view').click()
           cy.contains('remove')
        })

        it('sorted',function(){
          cy.contains('view').click()
            cy.get('.like').first().click();
            cy.get('.like').first().click();
            cy.get('.like').first().click();
            cy.get('.like').first().click();
            cy.get('.view').last().click();
            cy.get('.like').last().click();
            cy.get('.like').last().click();
            cy.get('.like').last().click();
            cy.get('.like').last().click();
            cy.get('.like').last().click();

          cy.contains('5 likes');
          cy.contains('4 likes')
        })

      })
  })


