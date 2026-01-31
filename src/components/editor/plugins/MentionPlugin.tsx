"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { TextNode } from "lexical";
import { createPortal } from "react-dom";
import { $createMentionNode, type MentionType } from "../nodes/MentionNode";
import { api } from "~/lib/trpc/client";
import { UserAvatar } from "~/components/ui/avatar";
import { FolderKanban, User } from "lucide-react";

class MentionOption extends MenuOption {
  id: string;
  name: string;
  type: MentionType;
  avatarUrl?: string | null;

  constructor(
    id: string,
    name: string,
    type: MentionType,
    avatarUrl?: string | null
  ) {
    super(name);
    this.id = id;
    this.name = name;
    this.type = type;
    this.avatarUrl = avatarUrl;
  }
}

function MentionMenuItem({
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: MentionOption;
}) {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
        isSelected ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      {option.type === "user" ? (
        <UserAvatar avatarUrl={option.avatarUrl} name={option.name} className="h-6 w-6" />
      ) : (
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted">
          <FolderKanban className="h-3.5 w-3.5" />
        </div>
      )}
      <span>{option.name}</span>
      <span className="ml-auto text-xs text-muted-foreground">
        {option.type === "user" ? "User" : "Project"}
      </span>
    </li>
  );
}

export function MentionPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);

  const { data: users } = api.user.search.useQuery(
    { query: queryString ?? "" },
    { enabled: !!queryString && queryString.length > 0 }
  );

  const { data: projects } = api.project.search.useQuery(
    { query: queryString ?? "" },
    { enabled: !!queryString && queryString.length > 0 }
  );

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("@", {
    minLength: 0,
  });

  const options = useMemo(() => {
    const results: MentionOption[] = [];

    if (users) {
      results.push(
        ...users.map(
          (user) =>
            new MentionOption(user.id, user.displayName, "user", user.avatarUrl)
        )
      );
    }

    if (projects) {
      results.push(
        ...projects.map(
          (project) =>
            new MentionOption(project.id, project.name, "project", project.coverUrl)
        )
      );
    }

    return results.slice(0, 10);
  }, [users, projects]);

  const onSelectOption = useCallback(
    (
      selectedOption: MentionOption,
      nodeToReplace: TextNode | null,
      closeMenu: () => void
    ) => {
      editor.update(() => {
        const mentionNode = $createMentionNode(
          selectedOption.type,
          selectedOption.id,
          selectedOption.name
        );
        if (nodeToReplace) {
          nodeToReplace.replace(mentionNode);
        }
        mentionNode.select();
        closeMenu();
      });
    },
    [editor]
  );

  return (
    <LexicalTypeaheadMenuPlugin<MentionOption>
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) =>
        anchorElementRef.current && options.length > 0
          ? createPortal(
              <div className="z-50 min-w-[200px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                <ul role="listbox">
                  {options.map((option, i) => (
                    <MentionMenuItem
                      key={option.id}
                      isSelected={selectedIndex === i}
                      onClick={() => {
                        setHighlightedIndex(i);
                        selectOptionAndCleanUp(option);
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(i);
                      }}
                      option={option}
                    />
                  ))}
                </ul>
              </div>,
              anchorElementRef.current
            )
          : null
      }
    />
  );
}
