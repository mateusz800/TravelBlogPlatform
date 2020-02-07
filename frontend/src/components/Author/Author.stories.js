import React from 'react'
import Author from './Author'

export default {
    title: 'components|Author',
    parameters: {
        component: Author,
        componentSubtitle: 'Display basic information about the author'
    }

};


export const basic = () => <Author name='Angelo Wise' />;

export const withAvatar = () => (
    <Author
        name='Angelo Wise'
        image='https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=867&q=80'
    />
)