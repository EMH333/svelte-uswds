import { error } from '@sveltejs/kit';
import posts from "./_posts.js";

const lookup = new Map();

posts.forEach(post => {
  lookup.set(post.slug, post);
});

export function load({params}) {
  const { slug } = params;

  if (lookup.has(slug)) {
    return lookup.get(slug);
  } else {
    error(404, {title: "Not Found", message: 'Nothing here'});
  }
}
