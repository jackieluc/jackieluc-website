import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import { blogProperties } from './mocks';

describe('home', () => {
  it('renders home page', () => {
    render(<Home recentBlogPostProperties={blogProperties} />);
    expect(screen.getByText(/software engineer, learn-it-all, punthusiast\./i)).toBeDefined();
  });
});
