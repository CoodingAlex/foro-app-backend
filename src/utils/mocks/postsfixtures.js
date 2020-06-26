const posts = [
  {
    _id: '5ef64859d65affb4eca66e0e',
    content: 'Lorem ipsu',
    author: 'alex',
    title: 'Lorem Title',
  },
  {
    _id: '5ef649a3ace636b72e439ae2',
    content: 'new Lorem Ipsu',
    author: 'alex',
    title: 'new lorem title',
  },
]

module.exports = {
  all: posts,
  byId: (id) => posts.filter((p) => p._id === id),
  create: (post) => {
    posts[0]._id, post.title
  },
  delete: (id) => id,
}
