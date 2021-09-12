import React from 'react'

import Header from './Header'
import Section from './Section'
import extensionTopRight from '../../assets/extensiontopright.jpg'
import settingImg from '../../assets/settingpage.jpg'
import groupCollectImage from '../../assets/groupcollect.jpg'
import groupExpandImage from '../../assets/groupexpand.jpg'

const Help = () => {
  return (
    <div className="bg-blue-900 w-full min-h-screen py-5 px-10 text-white">
      <Header />
      <Section>
        This extension(Dashboard) will help you manage the temporary links. Have
        you ever feel like to save some links for later but don't want to
        pollute your bookmarks? Do you want to save a group of tabs that you
        reopen later for a single purpose? This is the extension for you!
      </Section>
      <Section>
        <p>
          You will see this page when you first install Dashboard. Thank you for
          doing that!
        </p>
        <p>
          By default, Dashboard will try to replace the default new tab of
          Chrome. Don't worry, you can change afterwards. You won't lose the
          default new tab.
        </p>
        <p>
          Every time you click the Dashboard icon at the top-right, you will
          have access to the Dashboard page. If you choose to replace the
          default new tab, the new tab will do the same.
          <img
            src={extensionTopRight}
            alt="extension position"
            className="mx-auto"
          />
        </p>
      </Section>
      <Section>
        <div className="text-2xl font-bold pb-10">Setting</div>
        <img src={settingImg} alt="settings" />
        <div className="text-lg font-bold py-5">Enable Click to hide</div>
        <div>
          When you check this setting, click anywhere that doesn't have content
          will hide all content, and give you a clean background, for example,
          the middle of the top header. Click again to bring everything back.
        </div>
        <div className="text-lg font-bold py-5">
          Replace the default new tab
        </div>
        <div>
          This setting will toggle new tab between the default one and the
          Dashboard page.
        </div>
        <div className="text-lg font-bold py-5">Theme</div>
        <div>
          Currently we have four themes: Dark Blue, Dark, Light, Image
          background.
        </div>
        <div className="text-lg font-bold py-5">Bookmarks View</div>
        <div>Toggle bookmarks view</div>
      </Section>
      <Section>
        <div className="text-2xl font-bold pb-10">Collect</div>
        <div className="text-lg font-bold py-5">Main Collect</div>
        <div>
          At the top right corner, when you click the collect button, Dashboard
          will gather all tabs in to the list. All the tabs in the same window,
          will be closed after being collected. Tabs in different window will
          stay open.
        </div>
        <div className="text-lg font-bold py-5">Group Collect</div>
        <div>
          There is also a collect button for every group on the right. Click it,
          the same thing will happen as you click the main collect button, but
          the tabs will go to the group you clicked.
          <img src={groupCollectImage} alt="Group collect" />
        </div>
      </Section>
      <Section>
        <div className="text-2xl font-bold pb-10">Group</div>
        <div>
          Dashboard has six groups, they are the boxes locate on the right. You
          can collect links into group, rename group. Expand group will show the
          links in this group as a list, you can edit them individually.
          <img src={groupExpandImage} alt="groups" />
        </div>
      </Section>
      <Section>
        <div className="text-2xl font-bold pb-10">Links</div>
        <div>
          Every link, whether it is in the main list, or in a group(expand the
          group to see the option), you can rename, open, delete it. Just hover
          your cursor over it.
        </div>
      </Section>
      <Section>
        <div className="text-2xl font-bold pb-10">Open All</div>
        <div>
          Both the mail list, and groups have a 'Open all' button, as the name says, it will open all links with one click.
        </div>
      </Section>
      <Section>
        <div className="text-2xl font-bold pb-10">Reset</div>
        <div>
          This button will reset every links in Dashboard, which means all the
          temporary links you saved in Dashboard will be erased. The bookmarks
          will be intact.
        </div>
      </Section>
    </div>
  );
}

export default Help
