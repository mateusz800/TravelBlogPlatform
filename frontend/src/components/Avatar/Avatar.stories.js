import React from 'react'
import Avatar from './Avatar'

export default {
    title: 'components|Avatar',
    components: Avatar
}

export const differentSizes = () => (
    <div style={{ display: 'flex', alignItems: 'center'}}>
        <Avatar
            image='https://images.unsplash.com/photo-1441786485319-5e0f0c092803?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        />
        <Avatar
            image='https://images.unsplash.com/photo-1441786485319-5e0f0c092803?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
            size={70}
        />
        <Avatar
            image='https://images.unsplash.com/photo-1441786485319-5e0f0c092803?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
            size={100}
        />
    </div>
)