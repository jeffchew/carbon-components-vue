import { render } from '@testing-library/vue';
import CvLink from '..';

describe('CvLink', () => {
  it('renders sloted content', async () => {
    const dummyLinkText = 'Dummy Link';
    const { getByText } = render(CvLink, { slots: { default: dummyLinkText } });

    const anchor = await getByText(dummyLinkText);
    expect(anchor.textContent).toBe(dummyLinkText);
  });

  it("renders an anchor when neither 'href' and 'to' are defined", async () => {
    const { container } = render(CvLink);

    const anchor = container.firstElementChild;
    expect(anchor.tagName).toBe('A');
  });

  it("renders an anchor with href attribute when 'href' prop are defined", async () => {
    const dummyHref = 'ibm.com';
    const { container } = render(CvLink, {
      props: { href: dummyHref },
    });

    const anchor = container.firstElementChild;
    expect(anchor.tagName).toBe('A');
    expect(anchor.getAttribute('href')).toBe(dummyHref);
  });

  it("renders an anchor with href attribute when both 'href' and 'to' prop are defined", async () => {
    const dummyHref = '/path-href';
    const { container } = render(CvLink, {
      props: { href: dummyHref, to: '/path-to' },
    });

    const anchor = container.firstElementChild;
    expect(anchor.tagName).toBe('A');
    expect(anchor.getAttribute('href')).toBe(dummyHref);
  });

  it("renders a 'router-link' when 'to' prop is passed", async () => {
    const dummyTo = '/dummy-path';
    const { container } = render(CvLink, {
      props: { to: dummyTo },
      global: { stubs: ['router-link'] },
    });

    const routerLink = container.firstChild;
    expect(routerLink.tagName).toBe('ROUTER-LINK-STUB');
    expect(routerLink.getAttribute('to')).toBe(dummyTo);
  });

  it("renders link in disabled state when 'disabled' is true", () => {
    const { container } = render(CvLink, {
      props: { disabled: true, href: '/home' },
    });

    const element = container.firstElementChild;
    expect(element.classList.contains('bx--link--disabled')).toBe(true);
    expect(element.getAttribute('aria-disabled')).toBe('true');
  });

  it("sets link inline carbon class when 'inline' prop is passed", () => {
    const { container } = render(CvLink, {
      props: { inline: true, href: '/home' },
    });

    const element = container.firstElementChild;
    expect(element.classList.contains('bx--link--inline')).toBe(true);
  });
});
