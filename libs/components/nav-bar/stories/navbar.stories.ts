import { Meta, moduleMetadata } from '@storybook/angular';
import { SidebarModule } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Components/NavBar/Sidebar',
  decorators: [
    moduleMetadata({
      imports: [SidebarModule, BrowserAnimationsModule],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  }
} as Meta;

const template = `
  <div style='height: 100vh; width: 30%'>
  <sarcel-mavis-sidebar [closed]='closed'>
    <sarcel-mavis-sidebar-header> Header </sarcel-mavis-sidebar-header>
    <sarcel-mavis-sidebar-accordion title='Dashboards' icon='/assets/images/grid-outline.svg'>
      <sarcel-mavis-sidebar-link>Link 1</sarcel-mavis-sidebar-link>
      <sarcel-mavis-sidebar-link>Link 2</sarcel-mavis-sidebar-link>
      <sarcel-mavis-sidebar-link>Link 3</sarcel-mavis-sidebar-link>
      <sarcel-mavis-sidebar-link>Link 4</sarcel-mavis-sidebar-link>
      <sarcel-mavis-sidebar-link>Link 5</sarcel-mavis-sidebar-link>
    </sarcel-mavis-sidebar-accordion>
    <sarcel-mavis-sidebar-accordion title='Dashboards' icon='/assets/images/grid-outline.svg'>
      <sarcel-mavis-sidebar-link>Link 1</sarcel-mavis-sidebar-link>
      <sarcel-mavis-sidebar-link>Link 2</sarcel-mavis-sidebar-link>
      <sarcel-mavis-sidebar-link>Link 3</sarcel-mavis-sidebar-link>
      <sarcel-mavis-sidebar-link>Link 4</sarcel-mavis-sidebar-link>
      <sarcel-mavis-sidebar-link>Link 5</sarcel-mavis-sidebar-link>
    </sarcel-mavis-sidebar-accordion>
</sarcel-mavis-sidebar>
  </div>
`;

export const Default = (args: any) => ({
  template,
  props: {
    ...args,
  },
});

Default.args = {
  closed: false,
};


